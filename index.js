// Dependencias
const express = require("express");
const app = express();

// Rutas
const morgan = require("morgan");
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

// Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require ("./middleware/index");
const cors = require("./middleware/cors");

// Middleware CORS para permitir solicitudes desde el front
app.use(cors);

// Middleware de registro de solicitudes HTTP
app.use(morgan('dev'));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas públicas para usuario (registro e inicio de sesión)
app.use("/user", user.userRouter);

// Protección de rutas con el middleware de autenticación JWT
app.use(auth);

// Ruta de bienvenida
app.use(index);

// Rutas protegidas para pokemones
app.use("/pokemon", pokemon.pokemonRouter);

// Middleware para manejar rutas no encontradas
app.use(notFound);

app.listen(process.env.PORT || 3000,  () => {
  console.log("Server is running on port 3000");
});