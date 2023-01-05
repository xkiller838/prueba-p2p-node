const dotenv = require('dotenv').config();
const http = require('http');
const io = require('socket.io');

const { P2P_PORT = process.env.P2P_PORT, PEERS  } = process.env;

/* Splitting the PEERS env variable into an array. */
const peers = PEERS ? PEERS.split(',') : [];

class P2P {
  constructor() {
    this.io = io({
      cors: {
        origin:  process.env.P2P_CORS_ORIGIN,
      },
    });
    this.clients  = [];
  }

  listen(port = P2P_PORT) {
    this.server = http.createServer();
    this.io.attach(this.server);
    const app =  this.io.listen(port);
    app.on('connection', (socket) => this.onConnection(socket));

    // peers.forEach((peer) => {
    //   const socket = io.connect(peer);
    //   socket.on('connect', () => this.onConnection(socket));
    // });

    console.log(`socket escuchando en el puerto http://localhost: ${port}`);
  }

  connect(url) {
    this.io.connect(url);
    console.log(`Connected to ${url}`);
  }

  onConnection(socket) {
    this.clients.push(socket.id);

      socket.on("message", (message) => {
        console.log(`Recibido mensaje: ${message}`);
        socket.emit("message", "Hola cliente");
      });
      socket.on('disconnect', () => this.onDisconnect(socket));
  }

  onDisconnect(socket) {
    console.log('[ws:socket] disconnected.');
    this.clients = this.clients.filter((id) => id !== socket.id);
  }

  emit(event, data) {
    this.io.emit(event, data);
  }

}

module.exports = P2P;