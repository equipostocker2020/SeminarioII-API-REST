var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get('/', mdAutenticacion.verificaToken, (req, res) => {
    mysqlConnection.query('SELECT id_inscripcion, A.nombre, A.apellido, C.nombre_aula, D.nombre_materia, D.dia, D.horario, B.anho FROM inscripcion INNER JOIN usuario AS A ON A.id_usuario = inscripcion.id_alumno INNER JOIN aulas_materias AS B ON B.id_rel = inscripcion.id_aula_materia INNER JOIN aula AS C ON C.id_aula = B.id_aula INNER JOIN materia AS D ON D.id_materia = B.id_materia WHERE A.rol = "Estudiante"', (err, rows) => {
        if (!err) {
            res.status(200).json({
                ok: true,
                inscripciones: rows,
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

    var sql = "INSERT INTO `inscripcion` SET ?";
    var post = {
        id_alumno: body.id_alumno,
        id_aula_materia: body.id_aula_materia,
    };
    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(201).json({
                ok: true,
                inscripcion: post
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

    var sql = 'UPDATE `inscripcion` SET ? WHERE id_inscripcion = "' + id + '"';
    var post = {
        id_alumno: body.id_alumno,
        id_aula_materia: body.id_aula_materia,
    };
    console.log(post);
    mysqlConnection.query(sql, post, (err, rows) => {
        if (!err)
            res.status(200).json({
                ok: true,
                inscripcion: post
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
    var sql = "DELETE FROM `inscripcion` WHERE id_inscripcion = ?";

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
                    inscripcion: "Se ha borrado el Registro que corresponde al ID:" + id
                });
            }
    });
});

// ESTA SELECT ES PARA SEGUIR MAÑANA SELECT A.NOMBRE, A.APELLIDO,B.NOMBRE_AULA,C.NOMBRE_MATERIA FROM AULAS_MATERIAS INNER JOIN USUARIO AS A ON A.ID_USUARIO = AULAS_MATERIAS.ID_DOCENTE INNER JOIN AULA AS B ON B.ID_AULA=AULAS_MATERIAS.ID_AULA INNER JOIN MATERIA AS C ON C.ID_MATERIA=AULAS_MATERIAS.ID_MATERIA

module.exports = router;