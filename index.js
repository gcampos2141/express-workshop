const express = require("express");
const app = express();
const morgan = require("morgan");
const pokemon = require('./routes/pokemon');

app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.send("Bienvenido a la pokédex, ¿Cuál es tu pokemón?");
});

app.use("/pokemon", pokemon.pokemonRouter);

app.listen(process.env.PORT || 3000,  () => {
  console.log("Server is running on port 3000");
});