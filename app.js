var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

//importando rutas
var usuarioRoutes = require('./routes/users');
var loginRoutes = require('./routes/login');
var subjectsRoutes = require('./routes/subjects');
var classRoomRoutes = require('./routes/classroom');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// escuchando peticiones
app.listen(3000, () => {
    console.log(
        "Express server corriendo en el puerto 3000:\x1b[32m%s\x1b[0m ",
        " SchoolApp online"
    );
});

//rutas
app.use("/usuario", usuarioRoutes);
app.use("/login", loginRoutes);
app.use("/materia", subjectsRoutes);
app.use("/aula", classRoomRoutes);


module.exports = app;