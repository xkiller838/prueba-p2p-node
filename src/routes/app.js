/* sin esto no funciona el llamado de los env */
/* The above code is importing the dotenv, express, and cors packages. */
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

/* *Ruta de archivos* */
const userRouter = require('../routes/user.js');
const P2P = require("../qqtCoin/p2p/eje");

/* Creating a new instance of the P2P class. */
const p2p = new P2P();

/* Desestructuración. Es una forma de asignar valores a las variables.*/
const { HTTP_PORT = process.env.HTTP_PORT } = process.env;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*Dciendole a la aplicación que use  las rutas de userRouter. */
app.use(userRouter);

/* Diciéndole a la aplicación que escuche en HTTP_PORT. */
app.listen(HTTP_PORT, () => {
  console.log("API escuchando en el puerto http://localhost:" + HTTP_PORT);
});

/* Llamar al método `listen()` de la clase `P2P`. */
p2p.listen();

