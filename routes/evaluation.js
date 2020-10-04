var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get("/", mdAutenticacion.verificaToken, (req, res) => {
    mysqlConnection.query('SELECT B.nombre_materia, A.fecha, A.id_evaluacion, A.estado, C.nombre_instancia FROM evaluacion A INNER JOIN materia AS B ON B.id_materia = A.id_materia INNER JOIN instancia_evaluacion as C ON A.id_instancia = C.id_instancia', (err, rows) => {
        if (!err) {
            res.status(200).json({
                ok: true,
                evaluaciones: rows,
            });
        } else {
            return res.status(500).json({
                ok: false,
                error: err,
            });
        }
    });
});
router.post("/", mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var sql = "INSERT INTO `evaluacion` SET ?";
    var post = {
        id_materia: body.id_materia,
        id_instancia: body.id_instancia,
        fecha: body.fecha
    };
    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(201).json({
                ok: true,
                evaluacion: post
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
    var sql = "DELETE FROM `evaluacion` WHERE id_evaluacion= ?";

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
                    evaluacion: "Se ha borrado el Registro que corresponde al ID:" + id
                });
            }
    });
});
router.put("/:id", mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    var sql = 'UPDATE `evaluacion` SET ? WHERE id_evaluacion = "' + id + '"';
    var post = {
        id_materia: body.id_materia,
        id_instancia: body.id_instancia,
        fecha: body.fecha
    };
    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(200).json({
                ok: true,
                evaluacion: post
            });
        else {
            return res.status(400).json({
                ok: false,
                error: err,
            });
        }
    });
});

module.exports = router;