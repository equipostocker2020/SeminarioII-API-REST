var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var mdAutenticacion = require("../middlewares/autentication");

router.get("/alumno", (req, res) => {
    var sql = 'SELECT * FROM `USUARIO` WHERE USUARIO.ROL = "estudiante"';
    console.log(sql);
    mysqlConnection.query(sql, (err, rows) => {
        console.log(sql);
        if (!err)
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'Sin registros'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    usuario: rows
                });
            }
    });
});
router.get("/docente", (req, res) => {
    var sql = 'SELECT * FROM `USUARIO` WHERE USUARIO.ROL = "docente"';
    console.log(sql);
    mysqlConnection.query(sql, (err, rows) => {
        console.log(sql);
        if (!err)
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'Sin registros'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    usuario: rows
                });
            }
    });
});

module.exports = router;