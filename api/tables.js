// pages/api/tables.js
import sql from 'mssql';

const connection = `Server=192.168.73.69;Database=RD;User Id=IREDOM\\svc_sqldbrd;Password=HeLhA.la217073=;TrustServerCertificate=True`;

export default async function tables(req, res) {
    if (req.method === 'GET') {
        try {
            await sql.connect(connection);
            const result = await sql.query("SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE'");
            const tables = result.recordset.map(row => row.table_name);
            res.json(tables);
        } catch (error) {
            console.error('Erreur lors de la récupération des tables :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des tables.' });
        } finally {
            await sql.close();
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
