var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

const SELECT = 'SELECT * FROM `materia`';
const SELECT_BY_ID = 'SELECT * FROM `materia` WHERE id_materia = "';
const INSERT = 'INSERT INTO `materia` SET ?';
const UPDATE = 'UPDATE `materia` SET ? WHERE id_materia = "';
const DELETE = 'DELETE FROM `materia` WHERE id_materia= ?';
const SELECT_INSCRIPTOS = 'select c.nombre,c.apellido,c.dni,c.email,d.nombre_materia,d.dia,d.horario,b.anho from inscripcion as a inner join aulas_materias as b on a.id_aula_materia = b.id_rel inner join usuario as c on a.id_alumno = c.id_usuario inner join materia as d on b.id_materia = d.id_materia where a.id_alumno = ?';

// reglas de negocio : Admin crea actualiza y borrra

router.get("/", mdAutenticacion.verificaToken, (req, res) => {
    var sql = SELECT;
    mysqlConnection.query(sql, (err, rows) => {
        if (!err) {
            res.status(200).json({
                ok: true,
                materia: rows,
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
    var sql = SELECT_BY_ID + id + '"';

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
                    materia: rows
                });
            }
    });
});

router.get("/inscriptos/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_INSCRIPTOS + id + '"';

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
                    materia: rows
                });
            }
    });
});

router.post("/", mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var sql = INSERT;
    var post = {
        nombre_materia: body.nombre_materia,
        dia: body.dia,
        horario: body.horario
    };

    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(201).json({
                ok: true,
                materia: post
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
    var sql = UPDATE + id + '"';
    var post = {
        nombre_materia: body.nombre_materia,
        dia: body.dia,
        horario: body.horario,
    };

    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(200).json({
                ok: true,
                materia: post
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
                    materia: "Se ha borrado el Registro que corresponde al ID:" + id
                });
            }
    });
});

module.exports = router;