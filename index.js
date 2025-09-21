const express = require("express");
const app = express();
const { pokemon } = require('./pokedex.json');

app.get("/", (req, res) => {
  res.status(200);
  res.send("Bienvenido a la pokédex");
});

app.get("/pokemon/all", (req, res) => {
  res.status(200);
  res.send(pokemon);
})

app.get('/pokemon/:param', (req, res) => {
  const param = req.params.param;

  // Caso 1: validar si el parametro dado es un número de 1 a 3 dígitos
  if (/^\d{1,3}$/.test(param)) {
    const id = parseInt(param, 10);
    const index = id - 1;
    if (index >= 0 && index < pokemon.length) {
      return res.status(200).send(pokemon[index]);
    } else {
      return res.status(404).send("El pokemon no existe");
    }
  }

  // Caso 2: busqueda por nombre
  const name = param.toLowerCase();
  const poke = pokemon.find(p => p.name.toLowerCase() === name);
  if (poke) {
    return res.status(200).send(poke);
  }

  return res.status(404).send("El pokemon no existe");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

// process.env.PORT -> variable de entorno, 
// sirve para cuando subimos la app a un servidor 
// ya que el servidor nos asigna un puerto dinamicamente
app.listen(process.env.PORT || 3000,  () => {
  console.log("Server is running on port 3000");
});