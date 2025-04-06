import { createServer, IncomingMessage } from 'http';
import { createWsServer } from 'tinybase/synchronizers/synchronizer-ws-server';
import { WebSocketServer, WebSocket } from 'ws';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

// Something like this if you want to save Store state on the server:
import { createMergeableStore } from 'tinybase';
import { createFilePersister } from 'tinybase/persisters/persister-file';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.');
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAuth(request: IncomingMessage) {
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  const token = url.searchParams.get('token');
  console.log(`Auth attempt from ${request.socket.remoteAddress} with token: ${token ? 'present' : 'missing'}`);

  if (!token) {
    console.log('Auth failed: No token provided');
    return false;
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.log(`Auth failed: ${error.message}, ${error.toString()}`);
      return false;
    }

    if (!user) {
      console.log('Auth failed: No user found for token');
      return false;
    }

    console.log(`Auth succeeded for user: ${user.email}`);
    return true;
  } catch (error) {
    console.log('Auth failed: Error validating token', error);
    return false;
  }
}

// Ensure data directory exists
const dataDir = 'data';
if (!existsSync(dataDir)) {
  console.log('Creating data directory...');
  mkdirSync(dataDir);
}

console.log('Starting WebSocket server on port 8043...');
const wss = new WebSocketServer({
  port: 8043,
  verifyClient: async (info, callback) => {
    console.log(`Verifying client connection from ${info.req.socket.remoteAddress}`);
    const isAuthenticated = await checkAuth(info.req);
    if (isAuthenticated) {
      console.log(`Client ${info.req.socket.remoteAddress} verified successfully`);
      callback(true);
    } else {
      console.log(`Client ${info.req.socket.remoteAddress} verification failed`);
      callback(false, 401, 'Unauthorized');
    }
  }
});

// Log on connection and disconnection
wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  console.log(`New client connected from ${req.socket.remoteAddress}`);

  ws.on('close', () => {
    console.log(`Client disconnected from ${req.socket.remoteAddress}`);
  });
});

const wsServer = createWsServer(
  wss,
  // Something like this if you want to save Store state on the server:
  (pathId) => createFilePersister(
    createMergeableStore(),
    `${dataDir}/${pathId.replace(/[^a-zA-Z0-9]/g, '-')}.json`,
  ),
);
console.log('WebSocket server started successfully');

// -- Optional metrics handling hereon

console.log('Starting HTTP server on port 8044...');
createServer((request, response) => {
  if (request.url == '/healthcheck') {
    console.log('Healtcheck endpoint queried');
    response.writeHead(200);
    response.write(`healthy`);
  } else {
    response.writeHead(404);
  }
  response.end();
}).listen(8044);
console.log('HTTP server started successfully');
