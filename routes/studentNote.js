var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get('/', mdAutenticacion.verificaToken, (req, res) => {
    mysqlConnection.query('SELECT C.nombre, C.apellid, D.nombre_materia, E.nombre_instancia, F.fecha, G.anho, NOTA FROM nota_alumno A INNER JOIN inscripcion AS B ON B.is_inscripcion = A.id_inscripcion INNER JOIN usuario AS C ON C.id_usuario = B.id_alumno INNER JOIN materia AS D INNER JOIN instancia_evaluacion AS E ON E.id_instancia = A.id_instancia INNER JOIN evaluacion AS F INNER JOIN aulas_materias AS G WHERE C.ROL = "Estudiante"', (err, rows) => {
        if (!err) {
            res.status(200).json({
                ok: true,
                nota_alumno: rows,
            });
        } else {
            return res.status(500).json({
                ok: false,
                error: err,
            });
        }
    });
});
router.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var sql = "INSERT INTO `nota_alumno` SET ?";
    var post = {
        nombre_instancia: body.nombre_instancia,
    };
    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(201).json({
                ok: true,
                nota_alumno: post
            });
        else {
            return res.status(400).json({
                ok: false,
                error: err,
            });
        }
    });
});

router.put("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    var sql = 'UPDATE `nota_alumno` SET ? WHERE id_nota = "' + id + '"';
    var post = {
        nombre_instancia: body.nombre_instancia
    };
    console.log(post);
    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(200).json({
                ok: true,
                nota_alumno: post
            });
        else {
            return res.status(400).json({
                ok: false,
                error: err,
            });
        }
    });
});

router.delete("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = "DELETE FROM `nota_alumno` WHERE id_nota = ?";

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
                    nota_alumno: "Se ha borrado el Registro que corresponde al ID:" + id
                });
            }
    });
});

module.exports = router;