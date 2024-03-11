
import sql from 'mssql';

const connection = `Server=192.168.73.69;donneesbase=RD;User Id=IREDOM\\svc_sqldbrd;Password=HeLhA.la217073=;TrustServerCertificate=True`;

export default async function tables(req, res) {
    if (req.method !== 'POST') {

        try {
            const { tableName } = req.query;
            console.log('tableName:', tableName);
            await sql.connect(connection);

            const Rsql = `SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE OBJECTPROPERTY(OBJECT_ID(CONSTRAINT_SCHEMA + '.' + CONSTRAINT_NAME), 'IsPrimaryKey') = 1
            AND TABLE_NAME = '${tableName}'`;

            const result = await sql.query(Rsql);
            console.log('result:', result.recordset);

            if (result.recordset.length === 0) {
                return res.status(404).json({ error: 'Aucune colonne ID trouvée pour la table spécifiée.' });
            }

            // Récupére le nom de la colonne ID à partir du résultat de la requête
            const idColumn = result.recordset[0].COLUMN_NAME;
            console.log('idColumn:', idColumn);

            res.status(200).json({ idColumn });

        } catch (error) {
            console.error('Erreur lors de la récupération de la colonne ID :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des tables.' });
        } finally {
            await sql.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }



}
