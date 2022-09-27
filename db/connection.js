const mysql2 = require('mysql2');
// Connect to DB
const db = mysql2.createConnection ({
    host: 'localhost',
    port:3306,
    user: 'root',
    password: 'qwer1234',
    database: 'employee',
},
console.log('Welcome!')
);


module.exports = db;
