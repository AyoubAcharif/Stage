import sql from 'mssql';

const connection = `Server=192.168.73.69;donneesbase=RD;User Id=IREDOM\\svc_sqldbrd;Password=HeLhA.la217073=;TrustServerCertificate=True`;

export default async function handler(req, res) {
    const { table, id } = req.query;

    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await sql.connect(connection);
        const request = new sql.Request();
        const result = await request.query(`DELETE FROM ${table} WHERE ${idColumn} = ${id}`);

        if (result.rowsAffected && result.rowsAffected[0] > 0) {
            return res.status(200).json({ message: `Successfully deleted ${result.rowsAffected[0]} row(s).` });
        } else {
            return res.status(404).json({ error: 'No rows found for the specified ID.' });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await sql.close();
    }
}
