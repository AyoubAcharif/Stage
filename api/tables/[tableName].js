// pages/api/tables/[tableName].js
import sql from 'mssql';

const connection = `Server=vm-4-5-sql-01;donneesbase=RD;User Id=IREDOM\\svc_sqldbrd;Password=HeLhA.la217073=;TrustServerCertificate=True`;


export default async function tableName(req, res) {
    if (req.method === 'GET') {
        try {
            const { tableName } = req.query; // Récupération du nom de la table à partir de l'URL
            await sql.connect(connection);

            const query = `
        SELECT c.column_name, c.data_type
        FROM INFORMATION_SCHEMA.COLUMNS c
        LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE k ON c.TABLE_NAME = k.TABLE_NAME
          AND c.COLUMN_NAME = k.COLUMN_NAME
          AND k.TABLE_SCHEMA = c.TABLE_SCHEMA
          AND k.CONSTRAINT_NAME IN (
              SELECT CONSTRAINT_NAME
              FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
              WHERE CONSTRAINT_TYPE = 'PRIMARY KEY'
                AND TABLE_NAME = c.TABLE_NAME
                AND TABLE_SCHEMA = c.TABLE_SCHEMA
          )
        WHERE c.TABLE_NAME = '${tableName}' AND k.COLUMN_NAME IS NULL`;

            const request = new sql.Request();
            const result = await request.query(query);

            const columns = result.recordset;
            res.json(columns);
        } catch (error) {
            console.error('Erreur lors de la récupération des colonnes :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des colonnes.' });
        } finally {
            await sql.close();
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
