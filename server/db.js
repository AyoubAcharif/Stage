const sql = require('mssql');

//const config = {
//  server: 'vm-4-5-sql-01',
//database: 'RD',
//user: 'iredom\\aach',
//password: 'Hafsa^2002-2014=',
//options: {
//     trustedConnection: true,
//   trustServerCertificate: true,
//},
//driver: 'ODBC Driver 17 for SQL Server',
//port: 1433,
//}

const query = "SELECT * FROM dbo.";

const connection = "Server=vm-4-5-sql-01;Database=RD;Trusted_Connection=Yes;"

sql.query(connection, query, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
});


