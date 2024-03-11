

import sql from 'mssql';

const connection = `Server=vm-4-5-sql-01;donneesbase=RD;User Id=IREDOM\\svc_sqldbrd;Password=HeLhA.la217073=;TrustServerCertificate=True`;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { tableName, username } = req.query; // récupération à partir de l'URL (localhost:3000/api/tables/[tableName])
            const data = req.body; // = corps de la requête POST envoyé par le client


            await sql.connect(connection);

            let columns = Object.keys(data).join(', ');
            let values = Object.values(data).map(value => `'${value}'`).join(', ');

            const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
            await sql.query(query);


            const logQuery = `INSERT INTO Logs (actions,date_Action,heure_Action) VALUES (' ${username} a inséré des données dans ${tableName}', CURRENT_TIMESTAMP,CONVERT(time, GETDATE()));`;
            await sql.query(logQuery);

            res.status(200).json({ message: 'Insertion réussie' });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données :', error);
            res.status(500).json({ message: 'Erreur lors de l\'insertion des données.' });
        } finally {
            await sql.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
