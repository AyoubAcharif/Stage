// pages/historique.js

import Navbar from './components/navbar';
import sql from 'mssql';
import config from '../db';
import { useEffect } from 'react';
export default function Historique() {

    useEffect(() => {
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


    }, []);
    return (
        <>
            <Navbar />
            <h1>Historique</h1>
        </>
    );
}
// connection a la base de donnée


