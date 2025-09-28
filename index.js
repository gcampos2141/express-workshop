const express = require("express");
const app = express();
const { pokemon } = require('./pokedex.json');

// Middleware(funciones que se ejecutan antes de llegar a las rutas) para parsear el body de las solicitudes 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.status(200);
  res.send("Bienvenido a la pokédex, ¿Cuál es tu pokemón?");
});

app.post("/pokemon", (req, res) => {
  res.status(200).send(req.body);
});

app.get("/pokemon", (req, res) => {
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

  // Caso 2: busqueda por nombre solo con letras del alfabeto
  if (!/^[a-zA-Z]+$/.test(param)) { 
    return res.status(400).send("El parámetro debe ser un número o un nombre válido");
  }
  const name = param.toUpperCase();
  // Se realizo un cambio, se cambio find por filter para que retorne todos los pokemones que coincidan con el nombre
  // la diferencia entre find y filter es que "find" retorna el primer elemento que cumple la condición y "filter" retorna 
  // un array con todos los elementos que cumplen la condición, incluso si no hay ninguno, en ese caso retornará un array 
  // vacío (VIDEO NODE.JS 03)
  const poke = pokemon.filter(p => p.name.toUpperCase() === name.toUpperCase()); 
  (poke.length > 0) ? res.status(200).send(poke) : res.status(404).send("El pokemon no existe");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

app.listen(process.env.PORT || 3000,  () => {
  console.log("Server is running on port 3000");
});