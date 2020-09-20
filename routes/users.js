var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM `Usuarios`', (err, rows) => {
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

    var sql = "INSERT INTO `Usuarios` SET ?";
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

router.delete("/:id", (req, res) => {
    var id = req.params.id;
    var sql = "DELETE FROM `Usuarios` WHERE Id_usuario= ?";
    mysqlConnection.query(sql, id, (err, rows) => {
        if (!err)
            res.status(200).json({
                ok: true,
                usuario: id
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