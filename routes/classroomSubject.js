var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get("/", mdAutenticacion.verificaToken, (req, res) => {
    mysqlConnection.query('SELECT A.nombre, A.apellido, B.nombre_aula, C.nombre_materia, C.dia, C.horario, AA.anho FROM aulas_materias AA INNER JOIN usuario AS A ON A.id_usuario = AA.id_docente INNER JOIN aula AS B ON B.id_aula= AA.id_aula INNER JOIN materia AS C ON C.id_materia = AA.id_materia WHERE A.rol = "Docente"', (err, rows) => {
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

router.post("/", mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var sql = "INSERT INTO `aulas_materias` SET ?";
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

    var sql = 'UPDATE `aulas_materias` SET ? WHERE ID_REL = "' + id + '"';
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
    var sql = "DELETE FROM `aulas_materias` WHERE ID_REL = ?";

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