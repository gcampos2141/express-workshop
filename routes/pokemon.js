const express = require("express");
const pokemonRouter = express.Router();
const sql = require('../config/database');

pokemonRouter.post("/", (req, res) => {
  res.status(200).json(req.body);
});

pokemonRouter.get("/", async (req, res) => {
  res.status(200).json({ code: 1, messsage: pkm });
})

pokemonRouter.get('/:param', async (req, res) => {
  const param = req.params.param;
  const [pkm] =  await sql.query("SELECT * FROM POKEMON");

  // Caso 1: validar si el parametro dado es un número de 1 a 3 dígitos
  if (/^\d{1,3}$/.test(param)) {
    const id = parseInt(param, 10);
    const index = id - 1;
    if (index >= 0 && index < pkm.length) {
      return res.status(200).json({ code: 1, message: pkm[index] });
    } else {
      return res.status(404).json({ code: 404, message: "El pokemon no existe" });
    }
  }

  // Caso 2: busqueda por nombre solo con letras del alfabeto
  if (!/^[a-zA-Z]+$/.test(param)) {
    return res.status(400).send("El parámetro debe ser un número o un nombre válido");
  }

  const name = param.toLowerCase();
  const poke = pkm.filter(p => p && p.name && p.name.toLowerCase() === name);

 (poke.length > 0) ? res.status(200).send(poke) : res.status(404).send("El pokemon no existe" );
});

module.exports = { pokemonRouter }