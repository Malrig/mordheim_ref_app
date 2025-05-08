import { createServer, IncomingMessage } from 'http';
import { createWsServer } from 'tinybase/synchronizers/synchronizer-ws-server';
import { WebSocket } from 'ws';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  createReadStream,
  createWriteStream,
  unlinkSync,
} from 'fs';
import { WebSocketServerWrapper } from './WebSocketServerWrapper';
import { createMergeableStore } from 'tinybase';
import { createFilePersister } from 'tinybase/persisters/persister-file';
import * as zlib from 'zlib';
import * as path from 'path';
import cron from 'node-cron';

// Ensure data directory exists
const dataDir = 'data';
if (!existsSync(dataDir)) {
  console.log('Creating data directory...');
  mkdirSync(dataDir);
}

// Ensure backup directory exists
const backupDir = 'backups';
if (!existsSync(backupDir)) {
  console.log('Creating backup directory...');
  mkdirSync(backupDir);
}

// Function to create a compressed backup
function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `backup-${timestamp}.gz`);

  console.log(`Creating backup: ${backupFile}`);
  const output = createWriteStream(backupFile);
  const gzip = zlib.createGzip();

  gzip.pipe(output);

  readdirSync(dataDir).forEach((file) => {
    const filePath = path.join(dataDir, file);
    const fileStream = createReadStream(filePath);
    fileStream.pipe(gzip, { end: false });
    fileStream.on('end', () => {
      console.log(`Added ${file} to backup`);
    });
  });

  gzip.on('end', () => {
    console.log(`Backup ${backupFile} created successfully`);
  });

  gzip.end();
}

// Function to age out old backups
function ageOutBackups() {
  const files = readdirSync(backupDir)
    .map((file) => ({
      name: file,
      time: statSync(path.join(backupDir, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time); // Sort by modification time, newest first

  const now = Date.now();
  const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;

  const toDelete = files.filter((file, index) => {
    const age = now - file.time;

    // For backups older than 7 days, keep only 1 per week
    const weekIndex = Math.floor(age / sevenDaysInMillis);
    return (
      index !==
      files.findIndex(
        (f) => Math.floor((now - f.time) / sevenDaysInMillis) === weekIndex
      )
    );
  });

  // Delete the filtered backups
  toDelete.forEach((file) => {
    const filePath = path.join(backupDir, file.name);
    console.log(`Deleting old backup: ${filePath}`);
    unlinkSync(filePath);
  });
}

// Schedule the backup service to run daily at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running daily backup...');
  createBackup();
  ageOutBackups();
});

console.log('Backup service started successfully');

// WebSocket server setup
console.log('Starting WebSocket server on port 8043...');
const wss = new WebSocketServerWrapper({
  port: 8043,
});

// Log on connection and disconnection
wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  console.log(`New client connected from ${req.socket.remoteAddress}`);

  ws.on('close', () => {
    console.log(`Client disconnected from ${req.socket.remoteAddress}`);
  });
});

createWsServer(wss, (pathId) =>
  createFilePersister(
    createMergeableStore(),
    `${dataDir}/${pathId.replace(/[^a-zA-Z0-9]/g, '-')}.json`
  )
);
console.log('WebSocket server started successfully');

// HTTP server setup
console.log('Starting HTTP server on port 8044...');
createServer((request, response) => {
  if (request.url == '/healthcheck') {
    console.log('Healthcheck endpoint queried');
    response.writeHead(200);
    response.write(`healthy`);
  } else {
    response.writeHead(404);
  }
  response.end();
}).listen(8044);
console.log('HTTP server started successfully');
