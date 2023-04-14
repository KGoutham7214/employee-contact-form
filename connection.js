const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7214',
    database: 'employee_db'
});

module.exports = connection;