var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get("/", mdAutenticacion.verificaToken, (req, res) => {
    mysqlConnection.query('SELECT * FROM instancia_evaluacion', (err, rows) => {
        if (!err) {
            res.status(200).json({
                ok: true,
                instancia_evaluacion: rows,
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

    var sql = "INSERT INTO `instancia_evaluacion` SET ?";
    var post = {
        nombre_instancia: body.nombre_instancia,
    };
    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(201).json({
                ok: true,
                instancia_evaluacion: post
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

    var sql = 'UPDATE `instancia_evaluacion` SET ? WHERE id_instancia = "' + id + '"';
    var post = {
        nombre_instancia: body.nombre_instancia
    };
    console.log(post);
    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(200).json({
                ok: true,
                instancia_evaluacion: post
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
    var sql = "DELETE FROM `instancia_evaluacion` WHERE id_instancia = ?";

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
                    instancia_evaluacion: "Se ha borrado el Registro que corresponde al ID:" + id
                });
            }
    });
});

module.exports = router;