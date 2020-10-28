var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var bcrypt = require("bcryptjs");
var mdAutenticacion = require("../middlewares/autentication");

const SELECT = 'SELECT * FROM `usuario`';
const SELECT_BY_ID = 'SELECT * FROM `usuario` WHERE id_usuario = "';
const INSERT = 'INSERT INTO `usuario` SET ?';
const DELETE = 'DELETE FROM `usuario` WHERE id_usuario= ?';
const UPDATE = 'UPDATE `usuario` SET ? WHERE id_usuario = "';
const SELECT_INSCRIPCIONES = 'SELECT A.id_usuario, A.nombre, A.apellido, B.nombre_materia, B.dia, B.horario, C.anho, D.id_inscripcion, E.nombre_aula from usuario as A  inner join materia as B  inner join aulas_materias as C on c.id_materia = B.id_materia inner join inscripcion as D on D.id_alumno = A.id_usuario and D.id_aula_materia = c.id_rel inner join aula as E on E.id_aula = C.Id_aula where A.rol = "ESTUDIANTE" and A.id_usuario = "'
const SELECT_ASIGNACIONES_DOCENTE = 'Select A.nombre, A.apellido, B.nombre_materia, B.dia, B.horario, C.anho, E.nombre_aula from usuario as A inner join materia as B inner join aulas_materias as C on c.id_materia = B.id_materia inner join aula as E on E.id_aula = C.Id_aula where A.rol = "DOCENTE" and A.id_usuario = "'

router.get('/', (req, res) => {
    mysqlConnection.query(SELECT, (err, rows) => {
        if (!err) {
            res.status(200).json({
                ok: true,
                usuario: rows,
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
                    usuario: rows
                });
            }
    });
});

router.get('/alumno/inscripciones/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_INSCRIPCIONES + id + '"';

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
                    inscripciones: rows
                });
            }
    });
});

router.get('/docente/aulas_materias/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_ASIGNACIONES_DOCENTE + id + '"';

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
                    aulas_materias: rows
                });
            }
    });
});

router.post('/', (req, res) => {

    mysqlConnection.query(SELECT, (err, rows) => {
        if (!err) {
            var body = req.body;
            var sql = INSERT;
            if (rows.length == 0) {
                var post = {
                    nombre: body.nombre,
                    apellido: body.apellido,
                    direccion: body.direccion,
                    email: body.email,
                    dni: body.dni,
                    contraseña: bcrypt.hashSync(body.contraseña, 10),
                    cuit_cuil: body.cuit_cuil,
                    rol: 'ADMIN',
                    fecha_nac: body.fecha_nac,
                    edad: body.edad,
                };
            } else {
                var post = {
                    nombre: body.nombre,
                    apellido: body.apellido,
                    direccion: body.direccion,
                    email: body.email,
                    dni: body.dni,
                    contraseña: bcrypt.hashSync(body.contraseña, 10),
                    cuit_cuil: body.cuit_cuil,
                    rol: body.rol,
                    fecha_nac: body.fecha_nac,
                    edad: body.edad,
                };
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
                        error: err,
                    });
                }
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
                    usuario: "Se ha borrado el Registro que corresponde al ID:" + id
                });
            }
    });
});

router.put("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    var sql = UPDATE + id + '"';
    var post = {
        nombre: body.nombre,
        apellido: body.apellido,
        direccion: body.direccion,
        email: body.email,
        dni: body.dni,
        contraseña: body.contraseña,
        cuit_cuil: body.cuit_cuil,
        rol: body.rol,
        fecha_nac: body.fecha_nac,
        edad: body.edad,
        estado: body.estado,
    };

    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(200).json({
                ok: true,
                usuario: post
            });
        else {
            return res.status(400).json({
                ok: false,
                error: err,
            });
        }
    });
});

module.exports = router;