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
// select by id de modelo usuario para poder ver el rol y armar reglas de negocio.
const SELECT_BY_ID = 'SELECT * FROM `usuario` WHERE id_usuario = "';

router.get("/", mdAutenticacion.verificaToken, (req, res) => {
    var sql = SELECT_AULA;
    mysqlConnection.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
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

//prueba

router.get('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_AULA_BY_ID + id + '"';

    mysqlConnection.query(sql, [id], (err, rows) => {
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
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

router.post("/", mdAutenticacion.verificaToken, (req, res) => {
    //enviando id por params 
    var idUsuario = req.query.idUsuario;
    var date = new Date();
    // con el id enviado traigo el registro desde la bd.
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
            //itero el resultado de la peticion sql
            rows.forEach(function(row, err) {
                if (err) {
                    throw new Error(err);
                }
                //valido rol del registro para manejar logica pensada ...
                if (row.rol == "ESTUDIANTE" || row.rol == "DOCENTE") {
                    return res.status(400).json({
                        ok: false,
                        error: "Usuario sin privelegios para esta accion"
                    });
                    // pasando la validacion, sigo con flujo normal
                } else {
                    var body = req.body;
                    var sql = INSERT_AULA;
                    var post = {
                        nombre_aula: body.nombre_aula,
                        id_secuser: idUsuario,
                        dt_last_update: date,
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
                }
            });
        }
    });
});

router.put("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var idUsuario = req.query.idUsuario;
    var date = new Date();
    
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
                if (row.rol == "ESTUDIANTE" || row.rol == "DOCENTE") {
                    return res.status(400).json({
                        ok: false,
                        error: "Usuario sin privelegios para esta accion"
                    });
                } else {
                    var id = req.params.id;
                    var body = req.body;
                    var sql = UPDATE_AULA + id + '"';
                    var post = {
                        nombre_aula: body.nombre_aula,
                        estado: body.estado,
                        id_secuser: idUsuario,
                        dt_last_update: date,
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
                if (row.rol == "ESTUDIANTE" || row.rol == "DOCENTE") {
                    return res.status(400).json({
                        ok: false,
                        error: "Usuario sin privelegios para esta accion"
                    });
                } else {
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
                }
            });
        }
    });
});

module.exports = router;