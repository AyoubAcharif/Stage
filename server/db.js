const sql = require('mssql');

function connexion_db(username, password) {
    // Remplacez {user} et {password} par les identifiants fournis
    const connection = `Server=vm-4-5-sql-01;Database=RD;User Id=${username};Password=${password};TrustServerCertificate=True`;

    sql.connect(connection, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connecté à la base de données');
        }
    });


}

module.exports = connexion_db;


