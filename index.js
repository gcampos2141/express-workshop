const express = require("express");
const app = express();
const morgan = require("morgan");
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ code: 1, message: "Bienvenido a la pokédex, ¿Cuál es tu pokemón?" });
});

app.use("/pokemon", pokemon.pokemonRouter);
app.use("/user", user.userRouter);

app.use((req, res, next) => {
  res.status(404).send({ code: 404, message: "Ruta no encontrada" });
});

app.listen(process.env.PORT || 3000,  () => {
  console.log("Server is running on port 3000");
});