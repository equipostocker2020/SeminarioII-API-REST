const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'schoolApp',
    multipleStatements: true
});

mysqlConnection.connect(function(err) {
    if (err) {
        console.error(err);
        throw (err);

    } else {
        console.log("\x1b[32m%s\x1b[0m ", "SCHOOLAPP ONLINE");
    }
});

module.exports = mysqlConnection;