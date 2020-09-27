var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get("/", mdAutenticacion.verificaToken, (req, res) => {
    mysqlConnection.query('SELECT B.NOMBRE_MATERIA, A.FECHA, A.FINAL, C.NOMBRE_AULA FROM EVALUACION A INNER JOIN MATERIA AS B ON B.ID_MATERIA = A.ID_MATERIA INNER JOIN AULA AS C', (err, rows) => {
        if (!err) {
            res.status(200).json({
                ok: true,
                evaluaciones: rows,
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

    var sql = "INSERT INTO `EVALUACION` SET ?";
    var post = {
        id_materia: body.id_materia,
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
                errors: err,
            });
        }
    });
});
router.delete("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = "DELETE FROM `EVALUACION` WHERE ID_EVALUACION= ?";

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

    var sql = 'UPDATE `EVALUACION` SET ? WHERE ID_EVALUACION = "' + id + '"';
    var post = {
        id_materia: body.id_materia,
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
                errors: err,
            });
        }
    });
});

module.exports = router;