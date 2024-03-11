// pages/api/tables.js
import sql from 'mssql';

const connection = `Server=192.168.73.69;donneesbase=RD;User Id=IREDOM\\svc_sqldbrd;Password=HeLhA.la217073=;TrustServerCertificate=True`;

export default async function tables(req, res) {

    if (req.method !== 'POST') {
        try {
            const { tableName } = req.query;

            await sql.connect(connection);
            const request = new sql.Request();
            const data = await request.query(`SELECT * FROM ${tableName}`);



            res.status(200).json(data.recordset);
        } catch (error) {
            console.error('Erreur lors de la récupération des tables :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des tables.' });
        } finally {
            await sql.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }


}

