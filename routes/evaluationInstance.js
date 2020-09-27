var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM INSTANCIA_EVALUACION', (err, rows) => {
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

    var sql = "INSERT INTO `INSTANCIA_EVALUACION` SET ?";
    var post = {
        nombre_instancia: body.nombre_instancia,
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

    var sql = 'UPDATE `INSTANCIA_EVALUACION` SET ? WHERE ID_INSTANCIA = "' + id + '"';
    var post = {
        nombre_instancia: body.nombre_instancia
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
    var sql = "DELETE FROM `INSTANCIA_EVALUACION` WHERE ID_INSTANCIA = ?";

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