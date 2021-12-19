const mysql = require('mysql');

// create conncation

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '',
    database : 'dbrestapi'
});

conn.connect( (err) =>{
    if(err) throw err;
    console.log('Success connction');
})

modul.exports = conn; 