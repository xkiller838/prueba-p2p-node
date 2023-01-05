const dotenv = require('dotenv').config();
const http = require('http');
const io = require('socket.io');

const { P2P_PORT = process.env.P2P_PORT, PEERS  } = process.env;
console.log("🚀 ~ file: service.js:6 ~ P2P_PORT", P2P_PORT)


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
    this.io.listen(port);

    this.io.on('connection', (socket) => {

      // Almacena el ID del nuevo cliente
      this.clients.push(socket.id);
      console.log("🚀 ~ file: service.js:32 ~ P2P ~ this.io.on ~  this.clients",  this.clients)
      
    //  no funciona si la palabra message no esta tambien desde el cliente socket.on del main.js de vue
      socket.emit("message",  this.clients);
            
      socket.on('disconnect', () => {
        this.clients = this.clients.filter((id) => id !== socket.id);
        console.log(this.clients);
      });

      //cuando el usuario envia un mensaje el broadcast envia a todos los demas nodos la informacion menos al q la envia 
      socket.on("message", (message) => {
        console.log(`Recibido mensaje: ${message}`);
        socket.emit("message", "Hola cliente");
        socket.broadcast.emit('message', "mensaje para todos menos quien lo envia");
      });

    });
    console.log(`socket escuchando en el puerto http://localhost: ${port}`);
  }
}

module.exports = P2P;