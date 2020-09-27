var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT A.NOMBRE, A.APELLIDO,B.NOMBRE_AULA,C.NOMBRE_MATERIA, C.DIA,C.HORARIO,AA.ANHO FROM AULAS_MATERIAS AA INNER JOIN USUARIO AS A ON A.ID_USUARIO = AA.ID_DOCENTE INNER JOIN AULA AS B ON B.ID_AULA= AA.ID_AULA INNER JOIN MATERIA AS C ON C.ID_MATERIA= AA.ID_MATERIA WHERE A.ROL = "Docente"', (err, rows) => {
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

router.put("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    var sql = 'UPDATE `AULAS_MATERIAS` SET ? WHERE ID_REL = "' + id + '"';
    var post = {
        id_aula: body.id_aula,
        id_materia: body.id_materia,
        anho: body.anho,
        id_instancia: body.id_instancia,
        id_docente: body.id_docente,
    };
    console.log(post);
    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(200).json({
                ok: true,
                aula: post
            });
        else {
            return res.status(400).json({
                ok: false,
                errors: err,
            });
        }
    });
});

router.delete("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = "DELETE FROM `AULAS_MATERIAS` WHERE ID_REL = ?";

    mysqlConnection.query(sql, [id], (err, rows) => {
        if (!err)
            if (rows.affectedRows == 0) {
                res.status(400).json({
                    ok: false,
                    error: "No existen registros con ese ID: " + id
                });
            } else {
                res.status(200).json({
                    ok: true,
                    aula: "Se ha borrado el Registro que corresponde al ID:" + id
                });
            }
    });
});

module.exports = router;