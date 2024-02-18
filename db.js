const sql = require('mssql');
const { use } = require('react');

const config = {
    server: 'VM-4-5-SQL-01',
    database: 'RD',
    user: 'aach',
    options: {
        encrypt: true,
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true,

    }
}

const connectToDatabase = async () => {
    try {
        // Connexion à la base de données
        await sql.connect(config);
        console.log('Connexion à la base de données réussie.');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
    } finally {
        // Fermeture de la connexion

        console.log('Connexion à la base de données fermée.');
    }
};

connectToDatabase();
