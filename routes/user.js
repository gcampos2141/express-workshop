const express = require("express");
const userRouter = express.Router();
const sql = require('../config/database');

userRouter.post("/", async (req, res) => {  
    try {
        const {user_name, user_mail, user_password} = req.body;
        if(!user_name || !user_mail || !user_password) {
            return res.status(400).json({ code: 400, message: "Faltan datos obligatorios para crear un usuario" });
        }

        let query = `INSERT INTO user(user_name, user_mail, user_password)`;
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

userRouter.get("/", async (req, res) => {
    const query = "SELECT * FROM user";
    const rows = await sql.query(query);

    return res.status(200).json({code: 200, data: rows});
});

module.exports = { userRouter };
