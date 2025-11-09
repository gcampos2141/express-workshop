const express = require("express");
const jwt = require("jsonwebtoken");

// Middleware para proteger las rutas siguientes con autenticación JWT
module.exports = (req, res, next) => {
  try {
    // Verificar si el token está presente
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "debugkey");
    req.user = decoded;
    next();

  } catch (error) {
      res.status(401).json({ code: 401, message: "No tienes permiso :(" });
  }
}