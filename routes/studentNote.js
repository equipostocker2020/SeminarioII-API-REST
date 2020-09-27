var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT C.NOMBRE, C.APELLIDO, D.NOMBRE_MATERIA,E.NOMBRE_INSTANCIA, F.FECHA, G.ANHO FROM NOTA_ALUMNO A INNER JOIN INSCRIPCION AS B ON B.ID_INSCRIPCION = A.ID_INSCRIPCION INNER JOIN USUARIO AS C ON C.ID_USUARIO = B.ID_ALUMNO INNER JOIN MATERIA AS D INNER JOIN INSTANCIA_EVALUACION AS E INNER JOIN EVALUACION AS F INNER JOIN AULAS_MATERIAS AS G WHERE C.ROL = "Estudiante"', (err, rows) => {
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
router.post('/', (req, res) => {
    var body = req.body;

    var sql = "INSERT INTO `NOTA_ALUMNO` SET ?";
    var post = {
        nombre_instancia: body.nombre_instancia,
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

    var sql = 'UPDATE `NOTA_ALUMNO` SET ? WHERE NOTA = "' + id + '"';
    var post = {
        nombre_instancia: body.nombre_instancia
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
    var sql = "DELETE FROM `NOTA_ALUMNO` WHERE ID_NOTA = ?";

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