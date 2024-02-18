

import { executeQuery, disconnectDB } from '../../db';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Exécutez votre requête SQL ici
        const data = await executeQuery('SELECT * FROM dbo.Table_Test');

        // Renvoyer les données au format JSON
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        // Assurez-vous de vous déconnecter de la base de données après avoir terminé
        await disconnectDB();
    }
}
