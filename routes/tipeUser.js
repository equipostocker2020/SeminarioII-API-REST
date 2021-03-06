var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/db.config');
var mdAutenticacion = require("../middlewares/autentication");

const SELECT_ALUMNO = 'SELECT * FROM `usuario` WHERE usuario.rol = "estudiante"';
const SELECT_DOCENTE = 'SELECT * FROM `usuario` WHERE usuario.rol = "docente"';
const SELECT_INSCRIPCIONES = 'SELECT A.id_usuario, A.nombre, A.apellido, B.nombre_materia, B.dia, B.horario, C.anho, C.id_rel, D.id_inscripcion, E.nombre_aula from usuario as A inner join materia as B inner join aulas_materias as C on C.id_materia = B.id_materia inner join inscripcion as D on D.id_alumno = A.id_usuario and D.id_aula_materia = C.id_rel inner join aula as E on E.id_aula = C.Id_aula where A.rol = "ESTUDIANTE" and A.id_usuario = "';
const SELECT_ASIGNACIONES_DOCENTE = 'select A.id_rel,A.anho,B.id_materia,B.nombre_materia,B.dia, B.horario, E.id_usuario, F.id_aula,F.nombre_aula from aulas_materias as A inner join materia as B on B.id_materia = A.id_materia inner join usuario as E on E.id_usuario = A.id_docente inner join aula as F on F.id_aula = A.id_aula where A.id_docente = "';
const SELECT_BY_ID_AULA_MATERIA = 'SELECT A.id_inscripcion, B.id_rel, B.id_docente, B.anho, C.id_aula, C.nombre_aula, D.id_materia, D.nombre_materia, D.dia, D.horario, E.id_usuario, E.nombre, E.apellido, E.dni, E.email FROM inscripcion AS A INNER JOIN aulas_materias AS B ON B.id_rel = A.id_aula_materia INNER JOIN aula AS C ON C.id_aula = B.Id_aula INNER JOIN materia AS D ON D.id_materia = B.id_materia INNER JOIN usuario AS E ON E.id_usuario = A.id_alumno WHERE B.id_rel = "';
const SELECT_MIS_NOTAS = 'SELECT a.id_nota,a.nota, b.id_instancia, b.nombre_instancia, c.id_inscripcion, c.id_alumno, d.id_usuario,e.id_rel,f.id_materia,f.nombre_materia from nota_alumno as a inner join instancia_evaluacion as b on b.id_instancia = a.id_instancia inner join inscripcion as c on c.id_inscripcion = a.id_inscripcion inner join usuario as d on d.id_usuario = c.id_alumno inner join aulas_materias as e on e.id_rel = c.id_aula_materia inner join materia as f on f.id_materia = e.id_materia WHERE c.id_alumno = "';
const SELECT_DOCENTE_NOTASXALUMNO = 'SELECT a.id_nota,a.nota, b.id_instancia, b.nombre_instancia, c.id_inscripcion, c.id_alumno, d.id_usuario,e.id_rel, c.id_aula_materia, f.id_materia,f.nombre_materia,e.id_docente from nota_alumno as a inner join instancia_evaluacion as b on b.id_instancia = a.id_instancia inner join inscripcion as c on c.id_inscripcion = a.id_inscripcion inner join usuario as d on d.id_usuario = c.id_alumno inner join aulas_materias as e on e.id_rel = c.id_aula_materia inner join materia as f on f.id_materia = e.id_materia inner join usuario as g on g.id_usuario = e.id_docente WHERE c.id_alumno = "';
const SELECT_DOCENTE_ID = 'SELECT * from `usuario` WHERE rol = "DOCENTE" AND id_usuario = "';
const SELECT_ALUMNOS_ID = 'SELECT * from `usuario` WHERE rol = "ESTUDIANTE" AND id_usuario = "';
const SELECT_MIS_NOTAS_ALUMNO = 'SELECT a.id_nota,a.nota, b.id_instancia, b.nombre_instancia, c.id_inscripcion, c.id_alumno, d.id_usuario,e.id_rel,f.id_materia,f.nombre_materia from nota_alumno as a inner join instancia_evaluacion as b on b.id_instancia = a.id_instancia inner join inscripcion as c on c.id_inscripcion = a.id_inscripcion inner join usuario as d on d.id_usuario = c.id_alumno inner join aulas_materias as e on e.id_rel = c.id_aula_materia inner join materia as f on f.id_materia = e.id_materia WHERE c.id_inscripcion = "';

router.get("/alumno", mdAutenticacion.verificaToken, (req, res) => {
    var sql = SELECT_ALUMNO;

    mysqlConnection.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!err)
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'Sin registros'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    usuario: rows
                });
            }
    });
});

router.get("/alumno/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_ALUMNOS_ID + id + '"';

    mysqlConnection.query(sql, [id], (err, rows) => {
        // se puede cambiar la logica en principio si validas si hay un err podes decir else y mostrar el otro error
        // o viceverza. Asi evitas un IF pero es lo mismo, preguntas si hay error si es true lo devolves y si no
        //sigue validando .
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!err)
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'Sin registros'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    usuario: rows
                });
            }
    });
});

router.get("/docente", mdAutenticacion.verificaToken, (req, res) => {
    var sql = SELECT_DOCENTE;

    mysqlConnection.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!err)
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'Sin registros'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    usuario: rows
                });
            }
    });
});

router.get("/docente/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_DOCENTE_ID + id + '"';

    mysqlConnection.query(sql, [id], (err, rows) => {

        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!err)
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'Sin registros'
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
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
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
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
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

router.get('/notasxalumno/:id_rel', mdAutenticacion.verificaToken, (req, res) => {
    var id_rel = req.params.id_rel;
    var sql = SELECT_BY_ID_AULA_MATERIA + id_rel + '"';

    mysqlConnection.query(sql, [id_rel], (err, rows) => {
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!err)
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'No existen registros para este ID: ' + id_rel                
                });
            } else {
                res.status(200).json({
                    ok: true,
                    notas_x_alumno: rows
                });
            }
    });
});

router.get('/alumno/misnotas/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var sql = SELECT_MIS_NOTAS + id + '"';

    mysqlConnection.query(sql, [id], (err, rows) => {
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }

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

router.get('/docente/notasxalumno/:id_alumno', mdAutenticacion.verificaToken, (req, res) => {
    var id_alumno = req.params.id_alumno;
    var id_docente = req.query.id_usuario;
    var sql = SELECT_DOCENTE_NOTASXALUMNO + id_alumno + '"' + ' and e.id_docente = "' + id_docente + '"';
    console.log(sql);
    mysqlConnection.query(sql, [id_alumno], (err, rows) => {
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'No existen registros para este ID: ' + id_alumno
                });
            } else {
                res.status(200).json({
                    ok: true,
                    inscripciones: rows
                });
            }
    });
});

router.get('/alumno/misnotasalumno/:id_inscripcion', mdAutenticacion.verificaToken, (req, res) => {
    var id_inscripcion = req.params.id_inscripcion;
    var sql = SELECT_MIS_NOTAS_ALUMNO + id_inscripcion + '"';

    mysqlConnection.query(sql, [id_inscripcion], (err, rows) => {
        if (err) {
            res.status(500).json({
                ok: false,
                error: err
            });
        }

            if (rows == 0) {
                res.status(400).json({
                    ok: false,
                    error: 'No existen registros para este ID: ' + id_inscripcion
                });
            } else {
                res.status(200).json({
                    ok: true,
                    misnotasalumno: rows
                });
            }
    });
});

module.exports = router;