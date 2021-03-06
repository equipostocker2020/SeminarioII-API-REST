var mysqlConnection = require('../config/db.config');

const SELECT_BY_ID = 'SELECT * FROM `usuario` WHERE id_usuario = "';

exports.getUsuario = (req, res, next) => {
    var idUsuario = req.query.idUsuario;
    mysqlConnection.query(SELECT_BY_ID + idUsuario + '"', (err, rows) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        } else if (!idUsuario) {
            return res.status(400).json({
                ok: false,
                error: "No se envio ID usuario"
            });
        }
        if (rows.length) {
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
                    return res.status(200).json({
                        ok: true,
                        usuario: 'Usuario con permisos.'
                    });
                }
            });
        }
    });
    next();
}

// exports.getUsuario = new Promise((req, res, next) => {
//     var idUsuario = req.query.idUsuario;
//     mysqlConnection.query(SELECT_BY_ID + idUsuario + '"', (err, rows) => {
//         if (err) {
//             reject(res.send(err));
//         } else if (!idUsuario) {
//             reject(res.send("No se envio ID usuario"));
//         }
//         if (rows.length) {
//             rows.forEach(function(row, err) {
//                 if (err) {
//                     reject(res.send(err));
//                 }
//                 if (!row.rol == "Estudiante" || row.rol == "Docente") {
//                     reject(res.send('Usuario no tiene privilegios para esta accion.'));
//                 } else {
//                     resolve(res.send('Usuario con permisos.'));
//                 }
//             });
//         }
//         next();
//         return;
//     });
// });