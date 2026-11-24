const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mydb'
});

db.connect((err) => {
    if (err) {
        console.log('Erro ao conectar:', err);
        return;
    }

    console.log('Conectado ao MySQL!');
});

module.exports = db;