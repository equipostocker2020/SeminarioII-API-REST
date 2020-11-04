var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

//const SELECT = 'SELECT C.nombre, C.apellido, D.nombre_materia, E.nombre_instancia, F.fecha, G.anho, NOTA FROM nota_alumno A INNER JOIN inscripcion AS B ON B.id_inscripcion = A.id_inscripcion INNER JOIN usuario AS C ON C.id_usuario = B.id_alumno INNER JOIN materia AS D INNER JOIN instancia_evaluacion AS E ON E.id_instancia = A.id_instancia INNER JOIN evaluacion AS F INNER JOIN aulas_materias AS G WHERE C.ROL = "ESTUDIANTE"';
const SELECT = 'SELECT A.id_nota,A.nota, B.id_inscripcion, C.id_instancia, C.nombre_instancia, D.id_evaluacion, D.fecha, E.id_materia, E.nombre_materia, E.dia, E.horario, F.id_rel, F.anho, G.id_usuario, G.nombre, G.apellido, G.dni, G.email FROM nota_alumno AS A INNER JOIN inscripcion AS B ON B.id_inscripcion = A.id_inscripcion INNER JOIN instancia_evaluacion AS C ON C.id_instancia = A.id_instancia INNER JOIN evaluacion AS D ON D.id_instancia = A.id_instancia INNER JOIN materia AS E ON D.id_materia = D.id_materia AND D.id_instancia = C.id_instancia INNER JOIN aulas_materias AS F ON F.id_rel = B.id_aula_materia AND F.id_materia = E.id_materia INNER JOIN usuario AS G ON G.id_usuario = B.id_alumno where id_alumno = "';
const SELECT_NOTA_ALUMNO_BY_ID = 'SELECT * FROM nota_alumno WHERE id_nota ="';
const INSERT = 'INSERT INTO `nota_alumno` SET ?';
const UPDATE = 'UPDATE `nota_alumno` SET ? WHERE id_nota = "';
const DELETE = 'DELETE FROM `nota_alumno` WHERE id_nota = ?';
const SELECT_BY_ID = 'SELECT * FROM `usuario` WHERE id_usuario = "';

router.get('/', mdAutenticacion.verificaToken, (req, res) => {
    mysqlConnection.query(SELECT, (err, rows) => {
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

router.get('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_NOTA_ALUMNO_BY_ID + id + '"';

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

router.get('/nota_x_alumno/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT + id + '"';

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
                        id_inscripcion: body.id_inscripcion,
                        id_instancia: body.id_instancia,
                        nota: body.nota,
                        id_secuser: idUsuario,
                        dt_last_update: date,
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
                        id_inscripcion: body.id_inscripcion,
                        id_instancia: body.id_instancia,
                        nota: body.nota,
                        id_secuser: idUsuario,
                        dt_last_update: date,
                    };

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
                                    nota_alumno: "Se ha borrado el Registro que corresponde al ID:" + id
                                });
                            }
                    });
                }
            });
        }
    });
});
module.exports = router;