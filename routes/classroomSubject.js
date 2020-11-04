var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

const SELECT = 'SELECT AA.id_rel, AA.estado, A.nombre, A.apellido, A.id_usuario,B.id_aula, B.nombre_aula, C.id_materia, C.nombre_materia, C.dia, C.horario, AA.anho FROM aulas_materias AA INNER JOIN usuario AS A ON A.id_usuario = AA.id_docente INNER JOIN aula AS B ON B.id_aula= AA.id_aula INNER JOIN materia AS C ON C.id_materia = AA.id_materia WHERE A.rol = "DOCENTE"';
const SELECT_AULA_MATERIA_BY_ID = 'SELECT * FROM aulas_materias WHERE ID_REL = "';
const INSERT = 'INSERT INTO `aulas_materias` SET ?';
const UPDATE = 'UPDATE `aulas_materias` SET ? WHERE ID_REL = "';
const DELETE = 'DELETE FROM `aulas_materias` WHERE ID_REL = ?';
// select by id de modelo usuario para poder ver el rol y armar reglas de negocio.
const SELECT_BY_ID = 'SELECT * FROM `usuario` WHERE id_usuario = "';

router.get("/", mdAutenticacion.verificaToken, (req, res) => {
    mysqlConnection.query(SELECT, (err, rows) => {
        if (!err) {
            res.status(200).json({
                ok: true,
                aulas_materias: rows,
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
    var sql = SELECT_AULA_MATERIA_BY_ID + id + '"';

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

router.post("/", mdAutenticacion.verificaToken, (req, res) => {
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
                if (row.rol == "ESTUDIANTE") {
                    return res.status(400).json({
                        ok: false,
                        error: "Usuario sin privelegios para esta accion"
                    });
                } else {
                    var body = req.body;
                    var sql = INSERT;
                    var post = {
                        id_aula: body.id_aula,
                        id_materia: body.id_materia,
                        anho: body.anho,
                        id_docente: body.id_docente,
                        id_secuser: idUsuario,
                        dt_last_update: date,
                    };

                    mysqlConnection.query(sql, post, (err, rows) => {
                        if (!err)
                            res.status(201).json({
                                ok: true,
                                aulas_materias: post
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
                        id_aula: body.id_aula,
                        id_materia: body.id_materia,
                        anho: body.anho,
                        id_docente: body.id_docente,
                        estado: body.estado,
                        id_secuser: idUsuario,
                        dt_last_update: date,
                    };

                    mysqlConnection.query(sql, post, (err, rows) => {
                        if (!err)
                            res.status(200).json({
                                ok: true,
                                aulas_materias: post
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
                                    aulas_materias: "Se ha borrado el Registro que corresponde al ID:" + id
                                });
                            }
                    });
                }
            });
        }
    });
});

module.exports = router;