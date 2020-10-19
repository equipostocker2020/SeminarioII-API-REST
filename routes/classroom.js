var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");
var getCollections = require("../middlewares/getCollections");

const SELECT_AULA = 'SELECT * FROM `aula`';
const SELECT_AULA_BY_ID = 'SELECT * FROM `aula` WHERE id_aula = "';
const INSERT_AULA = "INSERT INTO `aula` SET ?";
const UPDATE_AULA = 'UPDATE `aula` SET ? WHERE id_aula = "';
const DELETE_AULA = 'DELETE FROM `aula` WHERE id_aula= ?';

// reglas de negocio : Admin crea actualiza y borrra


router.get("/", mdAutenticacion.verificaToken, (req, res) => {
    var sql = SELECT_AULA;
    mysqlConnection.query(sql, (err, rows) => {
        if (!err) {
            res.status(200).json({
                ok: true,
                aula: rows,
            });
        } else {
            return res.status(500).json({
                ok: false,
                error: err,
            });
        }
    });
});

router.get('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_AULA_BY_ID + id + '"';

    mysqlConnection.query(sql, [id], (err, rows) => {
        if (!err)
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'No existen registros para este ID: ' + id
                });
            } else {
                res.status(200).json({
                    ok: true,
                    aula: rows
                });
            }
    });
});

router.post("/", getCollections.getUsuario, mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var sql = INSERT_AULA;
    var post = {
        nombre_aula: body.nombre_aula,
    };

    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            return res.status(201).json({
                ok: true,
                aula: post
            });
        else {
            return res.status(400).json({
                ok: false,
                error: err,
            });
        }
    });
});

router.put("/:id", getCollections.getUsuario, mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    var sql = UPDATE_AULA + id + '"';
    var post = {
        nombre_aula: body.nombre_aula,
    };

    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(200).json({
                ok: true,
                aula: post
            });
        else {
            return res.status(400).json({
                ok: false,
                error: err,
            });
        }
    });
});

router.delete("/:id", getCollections.getUsuario, mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = DELETE_AULA;

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