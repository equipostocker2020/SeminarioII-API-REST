var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

const SELECT_ALUMNO = 'SELECT * FROM `usuario` WHERE usuario.rol = "estudiante"';
const SELECT_DOCENTE = 'SELECT * FROM `usuario` WHERE usuario.rol = "docente"';
const SELECT_INSCRIPCIONES = 'SELECT A.id_usuario, A.nombre, A.apellido, B.nombre_materia, B.dia, B.horario, C.anho, D.id_inscripcion, E.nombre_aula from usuario as A  inner join materia as B  inner join aulas_materias as C on C.id_materia = B.id_materia inner join inscripcion as D on D.id_alumno = A.id_usuario and D.id_aula_materia = C.id_rel inner join aula as E on E.id_aula = C.Id_aula where A.rol = "ESTUDIANTE" and A.id_usuario = "'
const SELECT_ASIGNACIONES_DOCENTE = 'Select A.nombre, A.apellido, B.nombre_materia, B.dia, B.horario, C.anho, E.nombre_aula from usuario as A inner join materia as B inner join aulas_materias as C on C.id_materia = B.id_materia inner join aula as E on E.id_aula = C.Id_aula where A.rol = "DOCENTE" and A.id_usuario = "'

router.get("/alumno", mdAutenticacion.verificaToken, (req, res) => {
    var sql = SELECT_ALUMNO;

    mysqlConnection.query(sql, (err, rows) => {
        console.log(sql);
        if (!err)
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'Sin registros'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    usuario: rows
                });
            }
    });
});

router.get("/docente", mdAutenticacion.verificaToken, (req, res) => {
    var sql = SELECT_DOCENTE;

    mysqlConnection.query(sql, (err, rows) => {
        console.log(sql);
        if (!err)
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'Sin registros'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    usuario: rows
                });
            }
    });
});

router.get('/alumno/inscripciones/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_INSCRIPCIONES + id + '"';
    console.log(sql);

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
                    inscripciones: rows
                });
            }
    });
});

router.get('/docente/aulas_materias/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_ASIGNACIONES_DOCENTE + id + '"';

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
                    aulas_materias: rows
                });
            }
    });
});

module.exports = router;