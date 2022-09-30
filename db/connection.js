const mysql2 = require('mysql2');

// Connects to DB //

const db = mysql2.createConnection ({
    host: 'localhost',
    port:3306,
    user: 'root',
    password: 'qwer1234',
    database: 'Tracky-Track',
    multipleStatements:true
},
console.log('Welcome my G!!')
);


module.exports = db;
