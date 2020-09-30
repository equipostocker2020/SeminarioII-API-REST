var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mysqlConnection = require('../config/db.config');
var SEED = require('../config/config').SEED;

router.post("/", (req, res) => {
    var body = req.body;
    var sql = 'SELECT * FROM `usuario` WHERE email = "' + body.email + '"';

    mysqlConnection.query(sql, (err, rows) => {
        if (!body.email) {
            res.status(400).json({
                ok: false,
                message: 'Request mal formulada, debe ingresar Mail para obtener TOKEN'
            });
        }
        if (!body.contraseña) {
            res.status(400).json({
                ok: false,
                message: 'Request mal formulada, debe ingresar Password para obtener TOKEN'
            });
        }
        if (rows == 0) {
            res.status(400).json({
                ok: false,
                message: 'Credenciales invalidas - email'
            });
        }  
        if (rows.length) {
            rows.forEach(function(row) {
                if (!bcrypt.compareSync(body.contraseña, row.contraseña)) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Credenciales invalidas - password',
                    });
                } else {
                    var token = jwt.sign({ usuario: rows }, SEED, { expiresIn: 14400 });
                    res.status(200).json({
                        ok: true,
                        usuario: row,
                        token: token,
                        id:row.id_usuario
                    });
                }
            });
        }
    });
});

module.exports = router;