const mysql2 = require('mysql2');

// Connect to database
const db = mysql2.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'qwery1235',
    database: 'employee'
    },
    console.log('Connected!')
);

module.exports = db;
