import { createServer } from 'https';
import { createWsServer } from 'tinybase/synchronizers/synchronizer-ws-server';
import { WebSocketServer } from 'ws';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

// Something like this if you want to save Store state on the server:
import { createMergeableStore } from 'tinybase';
import { createFilePersister } from 'tinybase/persisters/persister-file';

const handle_error: (error: any) => void = (error) => {
  console.error('Error:', error);
}

// Ensure data directory exists
const dataDir = 'data';
if (!existsSync(dataDir)) {
  console.log('Creating data directory...');
  mkdirSync(dataDir);
}

// SSL configuration
const sslDir = 'ssl';
if (!existsSync(sslDir)) {
  console.log('Creating SSL directory...');
  mkdirSync(sslDir);
}

const sslOptions = {
  key: readFileSync(join(sslDir, 'private.key')),
  cert: readFileSync(join(sslDir, 'certificate.crt')),
};

console.log('Starting secure WebSocket server on port 8043...');
const httpsServer = createServer(sslOptions, (request, response) => {
  if (request.url == '/metrics') {
    console.log('Metrics endpoint queried');
    response.writeHead(200);
    response.write(`# HELP sub_domains The total number of sub-domains.\n`);
    response.write(`# TYPE sub_domains gauge\n`);
    response.write(`sub_domains 1\n`);

    response.write(
      `# HELP peak_paths The highest number of paths recently managed.\n`,
    );
    response.write(`# TYPE peak_paths gauge\n`);
    response.write(`peak_paths ${stats.paths}\n`);

    response.write(
      `# HELP peak_clients The highest number of clients recently managed.\n`,
    );
    response.write(`# TYPE peak_clients gauge\n`);
    response.write(`peak_clients ${stats.clients}\n`);

    updatePeakStats(1);
  } else {
    response.writeHead(404);
  }
  response.end();
});

const wsServer = createWsServer(
  new WebSocketServer({
    server: httpsServer,
    path: '/ws'
  }),
  (pathId) => createFilePersister(
    createMergeableStore(),
    `${dataDir}/${pathId.replace(/[^a-zA-Z0-9]/g, '-')}.json`,
    handle_error
  ),
);

httpsServer.listen(8043, () => {
  console.log('Secure WebSocket server started successfully on port 8043');
});

// -- Optional metrics handling hereon

wsServer.addClientIdsListener(null, () => {
  console.log('Client connections changed:', wsServer.getStats());
  updatePeakStats();
});
const stats = { paths: 0, clients: 0 };

const updatePeakStats = (reset = 0) => {
  if (reset) {
    stats.paths = 0;
    stats.clients = 0;
  }
  const newStats = wsServer.getStats();
  stats.paths = Math.max(stats.paths, newStats.paths ?? 0);
  stats.clients = Math.max(stats.clients, newStats.clients ?? 0);
};
