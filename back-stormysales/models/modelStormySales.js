const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database:'sis_fact'
})

db.connect((err)=>{
    if(err){
        console.error('\n\x1b[31m',"Error al conectar en la base de datos.\n\n", err, '\x1b[0m\n');
        return
    }
    console.log(`\x1b[36m     Conexion Existosa a la base de datos.`, '\x1b[0m\n');
})

process.on("SIGINT",()=>{
    db.end();
    process.exit();
});

module.exports = db;