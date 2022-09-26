const mysql2 = require('mysql2');
// Connect to DB
const db = mysql2.createConnection ({
    host: 'localhost',
    port:3306,
    user: 'root',
    password: 'qwery1235',
    database: 'employee'
},
console.log('Welcome!')
);
module.exports = db;
