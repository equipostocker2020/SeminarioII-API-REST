var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

const SELECT_ALUMNO = 'SELECT * FROM `usuario` WHERE usuario.rol = "estudiante"';
const SELECT_DOCENTE = 'SELECT * FROM `usuario` WHERE usuario.rol = "docente"';

router.get("/alumno", mdAutenticacion.verificaToken, (req, res) => {
    var sql = SELECT_ALUMNO;

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

router.get("/docente", mdAutenticacion.verificaToken, (req, res) => {
    var sql = SELECT_DOCENTE;

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