var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var mdAutenticacion = require("../middlewares/autentication");


// obtener usuarios
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM `USUARIO`', (err, rows) => {
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
//obtener usuarios por id
router.get('/:id', (req, res) => {

    var id = req.params.id;
    var sql = 'SELECT * FROM `USUARIO` WHERE ID_USUARIO = "' + id + '"';

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
// crear un usuario
router.post('/', (req, res) => {
    var body = req.body;

    var sql = "INSERT INTO `USUARIO` SET ?";
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
//elimina un usuario
router.delete("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = "DELETE FROM `USUARIO` WHERE ID_USUARIO= ?";

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
// actualiza un usuario.
router.put("/:id", mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    var sql = 'UPDATE `USUARIO` SET ? WHERE ID_USUARIO = "' + id + '"';
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
                errors: err,
            });
        }
    });
});


module.exports = router;