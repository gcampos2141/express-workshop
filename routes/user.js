const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const sql = require('../config/database');

userRouter.post("/signin", async (req, res) => {  
    try {
        const {user_name, user_mail, user_password} = req.body;
        if(!user_name || !user_mail || !user_password) {
            return res.status(400).json({ code: 400, message: "Faltan datos obligatorios para crear un usuario" });
        }

        let query = `INSERT INTO usuarios_pokedex(user_name, user_mail, user_password)`;
        query += ` VALUES ("${user_name}", "${user_mail}", "${user_password}")`;

        const rows = await sql.query(query);

        if(rows.affectedRows == 1){
            res.status(201).json({code: 201, message:"Usuario creado exitosamente"});
        }else {
            res.status(500).json({code: 500, message:"Ocurrio un error al crear un usuario"});
        }
    } catch (error) {
        res.status(500).json({code: 500, message:"Error del servidor"});
    }
});

userRouter.post("/login", async (req, res) => {
    try{
        const {user_mail, user_password} = req.body;

        if(!user_mail || !user_password) {
            return res.status(400).json({ code: 400, message: "Faltan datos para iniciar sesión" });
        }

        // Verificar las credenciales con la base de datos
        const query = "SELECT * FROM usuarios_pokedex WHERE user_mail = ? AND user_password = ?";   
        const rows = await sql.query(query, [user_mail, user_password]); 

        // Si las credenciales son válidas, entonces se genera un token JWT
        if (rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail,
            }, "debugkey");

            res.status(200).json({code: 200, message: token});
        }else {
            res.status(401).json({code: 401, message:"Credenciales inválidas"});
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({code: 500, message:"Error del servidor"});
    }
});

userRouter.get("/", async (req, res) => {
    const query = "SELECT * FROM user";
    const rows = await sql.query(query);

    return res.status(200).json({code: 200, data: rows});
});

module.exports = { userRouter };
