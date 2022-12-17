import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app: Application = express();
app.set('trust proxy', true);
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {})

io.on('connection', (socket) => {
  console.log('user connected ', socket.id);

  socket.on('notice', (message) => {
    console.log('on notice : ', message);
  })
});

export { server };
