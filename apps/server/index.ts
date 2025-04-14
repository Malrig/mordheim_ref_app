import { createServer, IncomingMessage } from 'http';
import { createWsServer } from 'tinybase/synchronizers/synchronizer-ws-server';
import { WebSocket } from 'ws';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { WebSocketServerWrapper } from './WebSocketServerWrapper';

// Something like this if you want to save Store state on the server:
import { createMergeableStore } from 'tinybase';
import { createFilePersister } from 'tinybase/persisters/persister-file';

// Ensure data directory exists
const dataDir = 'data';
if (!existsSync(dataDir)) {
  console.log('Creating data directory...');
  mkdirSync(dataDir);
}

console.log('Starting WebSocket server on port 8043...');
const wss = new WebSocketServerWrapper({
  port: 8043
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
