const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const { log } = require('console');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

const connection = `Server=vm-4-5-sql-01;donneesbase=RD;User Id=IREDOM\\svc_sqldbrd;Password=HeLhA.la217073=;TrustServerCertificate=True`;


app.get('/api/tables', async (req, res) => {
    try {

        await sql.connect(connection);

        // Récupération des noms des tables
        const result = await sql.query("SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE'");


        const tables = result.recordset.map(row => row.table_name);

        // Envoi des données au client
        res.json(tables);
    } catch (error) {
        console.error('Erreur lors de la récupération des tables :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des tables.' });
    } finally {
        // Fermeture de la connexion à la base de données
        await sql.close();
    }
});

app.get('/api/tables/:tableName', async (req, res) => {
    try {
        const tableName = req.params.tableName;

        await sql.connect(connection);

        // Récupération des colonnes de la table, des types de données et des clés primaires
        const result = await sql.query(`SELECT 
        c.column_name, 
        c.data_type
    FROM 
        INFORMATION_SCHEMA.COLUMNS c
    LEFT JOIN 
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE k ON c.TABLE_NAME = k.TABLE_NAME
        AND c.COLUMN_NAME = k.COLUMN_NAME
        AND k.TABLE_SCHEMA = c.TABLE_SCHEMA
        AND k.CONSTRAINT_NAME IN (
            SELECT CONSTRAINT_NAME
            FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
            WHERE CONSTRAINT_TYPE = 'PRIMARY KEY'
            AND TABLE_NAME = c.TABLE_NAME
            AND TABLE_SCHEMA = c.TABLE_SCHEMA
        )
    WHERE 
        c.TABLE_NAME = '${tableName}'
        AND k.COLUMN_NAME IS NULL  
    `);

        const columns = result.recordset;

        // Envoi des données au client
        res.json(columns);
    } catch (error) {
        console.error('Erreur lors de la récupération des colonnes :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des colonnes.' });
    } finally {
        // Fermeture de la connexion à la base de données
        await sql.close();
    }
});

app.post('/api/tables/:tableName/insertion', async (req, res) => {

    const tableName = req.params.tableName;
    const data = req.body;
    try {
        await sql.connect(connection);


        let columns = Object.keys(data).join(', '); //Objects: récupère les clés de l'objet 
        let values = Object.values(data).map(value => `'${value}'`).join(', ');

        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
        const result = await sql.query(query);

        res.json({ message: 'Insertion réussie', result });
        return res.status(200);
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données :', error);
        res.status(500).json({ message: 'Erreur lors de l\'insertion des données.' });
    } finally {
        await sql.close();
    }
});


// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur pour db sur le port ${port}`);
});
