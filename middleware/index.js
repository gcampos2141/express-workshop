module.exports = (req, res) => {
  res.status(200).json({ code: 1, message: "Bienvenido a la pokédex, ¿Cuál es tu pokemón?" });
}