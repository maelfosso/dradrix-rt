import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

class SocketWrapper {
  private _io?: Server;

  get io() {
    if (!this._io) {
      throw new Error('Cannot access Io before connecting');
    }

    return this._io;
  }

  init(server: HttpServer) {
    this._io = new Server(server, {});

    this._io.on('connection', (socket: Socket) => {
      console.log('user connected : ', socket.id);

      socket.on('notice', (message) => {
        console.log('on notice: ', message);
      });
    });
  }
}

export const socketWrapper = new SocketWrapper();
