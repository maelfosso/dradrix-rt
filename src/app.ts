import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketWrapper } from './socket-wrapper';

const app: Application = express();
app.set('trust proxy', true);
app.use(express.json());

const server = createServer(app);
socketWrapper.init(server);

export { server };
