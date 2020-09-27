var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get('/', mdAutenticacion.verificaToken, (req, res) => {
    mysqlConnection.query('SELECT ID_INSCRIPCION, A.NOMBRE, A.APELLIDO, C.NOMBRE_AULA, D.NOMBRE_MATERIA, D.DIA,D.HORARIO, B.ANHO FROM INSCRIPCION INNER JOIN USUARIO AS A ON A.ID_USUARIO = INSCRIPCION.ID_ALUMNO INNER JOIN AULAS_MATERIAS AS B ON B.ID_REL = INSCRIPCION.ID_AULA_MATERIA INNER JOIN AULA AS C ON C.ID_AULA = B.ID_AULA INNER JOIN MATERIA AS D ON D.ID_MATERIA = B.ID_MATERIA WHERE A.ROL = "Estudiante"', (err, rows) => {
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

router.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var sql = "INSERT INTO `INSCRIPCION` SET ?";
    var post = {
        id_alumno: body.id_alumno,
        id_aula_materia: body.id_aula_materia,
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

    var sql = 'UPDATE `INSCRIPCION` SET ? WHERE ID_INSCRIPCION = "' + id + '"';
    var post = {
        id_alumno: body.id_alumno,
        id_aula_materia: body.id_aula_materia,
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
    var sql = "DELETE FROM `INSCRIPCION` WHERE ID_INSCRIPCION = ?";

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

// ESTA SELECT ES PARA SEGUIR MAÑANA SELECT A.NOMBRE, A.APELLIDO,B.NOMBRE_AULA,C.NOMBRE_MATERIA FROM AULAS_MATERIAS INNER JOIN USUARIO AS A ON A.ID_USUARIO = AULAS_MATERIAS.ID_DOCENTE INNER JOIN AULA AS B ON B.ID_AULA=AULAS_MATERIAS.ID_AULA INNER JOIN MATERIA AS C ON C.ID_MATERIA=AULAS_MATERIAS.ID_MATERIA

module.exports = router;