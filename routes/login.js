var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mysqlConnection = require('../config/db.config');
var SEED = require('../config/config').SEED;

const SELECT = 'SELECT * FROM `usuario` WHERE email = "';

router.post("/", (req, res) => {
    var body = req.body;
    var sql = SELECT + body.email + '"';

    mysqlConnection.query(sql, (err, rows) => {
        if (!body.email) {
            res.status(400).json({
                ok: false,
                error: 'Request mal formulada, debe ingresar Mail para obtener TOKEN'
            });
        }
        if (!body.contraseña) {
            res.status(400).json({
                ok: false,
                error: 'Request mal formulada, debe ingresar Password para obtener TOKEN'
            });
        }
        if (rows == 0) {
            res.status(400).json({
                ok: false,
                error: 'Credenciales invalidas - email'
            });
        }
        if (rows.length) {
            rows.forEach(function(row, err) {
                if (err) {
                    throw new Error("Error inesperado...");
                }
                if (!bcrypt.compareSync(body.contraseña, row.contraseña)) {
                    return res.status(400).json({
                        ok: false,
                        error: 'Credenciales invalidas - password',
                    });
                } else {
                    var token = jwt.sign({ usuario: rows }, SEED, { expiresIn: 14400 });
                    res.status(200).json({
                        ok: true,
                        email: row.email,
                        id: row.id_usuario,
                        usuario: row,
                        token: token
                    });
                }
                return;
            });
        }
    });
});

module.exports = router;