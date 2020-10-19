var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var mysqlConnection = require('../config/db.config');

const SELECT_BY_ID = 'SELECT * FROM `usuario` WHERE id_usuario = "';


exports.verificaToken = function(req, res, next) {
    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token',
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

exports.getUsuario = function(req, res, next) {
    var idUsuario = req.query.idUsuario;
    mysqlConnection.query(SELECT_BY_ID + idUsuario + '"', (err, rows) => {
        if (!err) {
            if (!idUsuario) {
                return res.status(400).json({
                    ok: false,
                    error: "No se envio ID usuario"
                });
            } else if (rows.length) {
                rows.forEach(function(row, err) {
                    if (err) {
                        throw new Error(err);
                    }
                    if (row.rol == "Estudiante" || row.rol == "Docente") {
                        return res.status(400).json({
                            ok: false,
                            error: 'Usuario no tiene privilegios para esta accion.'
                        });
                    } else {
                        return row;
                    }
                });
            }
        }
    });
    next();
};