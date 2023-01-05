const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  },
});

const dotenv = require('dotenv').config();

let clients = [];

io.on('connection', socket => {
  // Almacena el ID del nuevo cliente
  clients.push(socket.id);

  // Envía el ID del nuevo cliente a todos los demás clientes
  io.emit('new-client', socket.id);

  // Cuando un cliente se desconecta, elimina su ID de la lista de clientes
  socket.on('disconnect', () => {
    clients = clients.filter(id => id !== socket.id);
  });

  // Cuando un cliente envía un mensaje a otro cliente específico, reenvía el mensaje
  socket.on('send-message', (recipientId, message) => {
    io.to(recipientId).emit('message', message);
  });
});

// Aquí puedes configurar el puerto en el que deseas que se ejecute Socket.io
const port = 3001;

server.listen(port, () => {
  console.log(`Socket.io corriendo en http://localhost:${port}`);
});