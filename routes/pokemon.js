const express = require("express");
const pokemonRouter = express.Router();
const sql = require('../config/database');

pokemonRouter.post("/", async (req, res) => {  
  const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;
  if(!pok_name || !pok_height || !pok_weight || !pok_base_experience) {
      return res.status(400).json({code: 400, message:"Faltan datos obligatorios para crear un Pokemón"});
  }else{
      let query = `INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)`;
      query += ` VALUES ("${pok_name}", ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

      const rows = await sql.query(query);
      
      if(rows.affectedRows == 1){
          res.status(201).json({code: 200, message:"Pokémon creado exitosamente"});

      }else { res.status(500).json({code: 500, message:"Ocurrio un error al crear un Pokemón nuevo"}); }
  }

});

pokemonRouter.delete('/:param', async (req, res) => {
  const param = req.params.param;

  // Validar si el parámetro es un número
  if (!/^\d+$/.test(param)) {
    return res.status(400).json({ code: 400, message: "El parámetro debe ser un número" });
  }

  const id = parseInt(param, 10);
  const query = `DELETE FROM pokemon WHERE pok_id = ${id}`;
  const rows = await sql.query(query);

  if(rows.affectedRows == 1){
      res.status(200).json({code: 200, message:"Pokémon eliminado correctamente"});
  }else {
      res.status(404).json({code: 404, message:"Pokémon no encontrado"});
  }
});

pokemonRouter.put('/:param', async (req, res) => {
  const param = req.params.param;
  
  if (!/^\d+$/.test(param)) {
    return res.status(400).json({ code: 400, message: "El parámetro debe ser un número" });
  }
  
  const id = parseInt(param, 10);
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

  if(!pok_name || !pok_height || !pok_weight || !pok_base_experience) {
    return res.status(400).json({ code: 400, message: "Faltan datos obligatorios para actualizar un Pokemón" });
  }

  let query = `UPDATE pokemon SET pok_name = '${pok_name}', pok_height = ${pok_height}, pok_weight = ${pok_weight}, pok_base_experience = ${pok_base_experience}`;
  query += ` WHERE pok_id = ${id}`;

  const rows = await sql.query(query);

  if (rows.affectedRows == 1) {
    res.status(200).json({ code: 200, message: "Pokémon actualizado correctamente" });
  } else {
    res.status(404).json({ code: 404, message: "Pokémon no encontrado" });
  }

});

pokemonRouter.patch('/:param', async (req, res) => {  
  try {
    const param = req.params.param;
  
    if (!/^\d+$/.test(param)) {
      return res.status(400).json({ code: 400, message: "El parámetro debe ser un número" });
    }

    let query = `UPDATE pokemon SET pok_name = '${req.body.pok_name}'`;
    query += ` WHERE pok_id = ${param}`;

    const rows = await sql.query(query);

    if (rows.affectedRows == 1) {
      res.status(200).json({ code: 200, message: "Pokémon actualizado correctamente" });
    } else {
      res.status(404).json({ code: 404, message: "Pokémon no encontrado" });
    }
    
  } catch (error) {
    res.status(500).json({ code: 500, message: "Error interno del servidor" });
  }
  
});

pokemonRouter.get("/", async (req, res) => {
  const pkm = await sql.query("SELECT * FROM POKEMON");
  res.status(200).json({ code: 200, message: pkm });
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

module.exports = { pokemonRouter };