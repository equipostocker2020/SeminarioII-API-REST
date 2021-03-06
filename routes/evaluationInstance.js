var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

const SELECT = 'SELECT * FROM instancia_evaluacion';
const SELECT_INSTANCIA_BY_ID = 'SELECT * FROM instancia_evaluacion WHERE id_instancia = "';
const INSERT = 'INSERT INTO `instancia_evaluacion` SET ?';
const UPDATE = 'UPDATE `instancia_evaluacion` SET ? WHERE id_instancia = "';
const DELETE = 'DELETE FROM `instancia_evaluacion` WHERE id_instancia = ?';
const SELECT_BY_ID = 'SELECT * FROM `usuario` WHERE id_usuario = "';
// reglas de negocio : Admin y docente crea actualiza y borrra
router.get("/", mdAutenticacion.verificaToken, (req, res) => {
    mysqlConnection.query(SELECT, (err, rows) => {
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

router.get('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_INSTANCIA_BY_ID + id + '"';

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

router.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var idUsuario = req.query.idUsuario;

    mysqlConnection.query(SELECT_BY_ID + idUsuario + '"', (err, rows) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        } else if (!idUsuario) {
            return res.status(400).json({
                ok: false,
                error: "No se envio ID usuario"
            });
        } else if (rows == 0) {
            return res.status(400).json({
                ok: false,
                error: "El id enviado no corresponde a un usuario registrado: " + idUsuario
            });
        }
        if (rows.length) {
            rows.forEach(function(row, err) {
                if (err) {
                    throw new Error(err);
                }
                if (row.rol == "ESTUDIANTE") {
                    return res.status(400).json({
                        ok: false,
                        error: "Usuario sin privelegios para esta accion"
                    });
                } else {
                    var body = req.body;
                    var sql = INSERT;
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
                }
            });
        }
    });
});

router.put("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var idUsuario = req.query.idUsuario;

    mysqlConnection.query(SELECT_BY_ID + idUsuario + '"', (err, rows) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        } else if (!idUsuario) {
            return res.status(400).json({
                ok: false,
                error: "No se envio ID usuario"
            });
        } else if (rows == 0) {
            return res.status(400).json({
                ok: false,
                error: "El id enviado no corresponde a un usuario registrado: " + idUsuario
            });
        }
        if (rows.length) {
            rows.forEach(function(row, err) {
                if (err) {
                    throw new Error(err);
                }
                if (row.rol == "ESTUDIANTE") {
                    return res.status(400).json({
                        ok: false,
                        error: "Usuario sin privelegios para esta accion"
                    });
                } else {
                    var id = req.params.id;
                    var body = req.body;
                    var sql = UPDATE + id + '"';
                    var post = {
                        nombre_instancia: body.nombre_instancia
                    };

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
                }
            });
        }
    });
});

router.delete("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var idUsuario = req.query.idUsuario;

    mysqlConnection.query(SELECT_BY_ID + idUsuario + '"', (err, rows) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        } else if (!idUsuario) {
            return res.status(400).json({
                ok: false,
                error: "No se envio ID usuario"
            });
        } else if (rows == 0) {
            return res.status(400).json({
                ok: false,
                error: "El id enviado no corresponde a un usuario registrado: " + idUsuario
            });
        }
        if (rows.length) {
            rows.forEach(function(row, err) {
                if (err) {
                    throw new Error(err);
                }
                if (row.rol == "ESTUDIANTE") {
                    return res.status(400).json({
                        ok: false,
                        error: "Usuario sin privelegios para esta accion"
                    });
                } else {
                    var id = req.params.id;
                    var sql = DELETE;

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
                }
            });
        }
    });
});

module.exports = router;