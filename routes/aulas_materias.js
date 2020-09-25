var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM `AULAS_MATERIAS`', (err, rows) => {
        if (!err) {
            res.status(200).json({
                ok: true,
                usuario: rows,
            });
        } else {
            return res.status(500).json({
                ok: false,
                errors: err,
            });
        }
    });
});

router.post('/', (req, res) => {
    var body = req.body;

    var sql = "INSERT INTO `AULAS_MATERIAS` SET ?";
    var post = {
        id_aula: body.id_aula,
        id_materia: body.id_materia,
        anho: body.anho,
        id_instancia: body.id_instancia,
        id_docente: body.id_docente,
    };
    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(201).json({
                ok: true,
                usuario: post
            });
        else {
            return res.status(400).json({
                ok: false,
                errors: err,
            });
        }
    });
});

// ESTA SELECT ES PARA SEGUIR MAÑANA SELECT A.NOMBRE, A.APELLIDO,B.NOMBRE_AULA,C.NOMBRE_MATERIA FROM AULAS_MATERIAS INNER JOIN USUARIO AS A ON A.ID_USUARIO = AULAS_MATERIAS.ID_DOCENTE INNER JOIN AULA AS B ON B.ID_AULA=AULAS_MATERIAS.ID_AULA INNER JOIN MATERIA AS C ON C.ID_MATERIA=AULAS_MATERIAS.ID_MATERIA

module.exports = router;