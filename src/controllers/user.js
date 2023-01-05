const usercontroller = {};

usercontroller.index  = async (req, res) =>{
  const usuarios = [
    { nombre: 'Juan', edad: 25 },
    { nombre: 'Ana', edad: 23 },
    { nombre: 'Pablo', edad: 30 }
  ];
  res.json(usuarios);  
};

usercontroller.create  = async (req, res) =>{
  res.json(req.body);  
};

usercontroller.chat  = async (req, res) =>{
  const io = require('socket.io')();
  const socket = io('127.0.0.1:3000');

// Escuchar mensajes del servidor
socket.on('mensaje', (mensaje) => {
  console.log('mensaje recibido:', mensaje);
});

// Enviar un mensaje al servidor
socket.emit('mensaje', 'Hola, soy un usuario de la red P2P');
};


module.exports = usercontroller;