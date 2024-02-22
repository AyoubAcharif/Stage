// pages/historique.js

import Navbar from './components/navbar';
import sql from 'mssql';
import config from '../server/db';
import { useEffect } from 'react';

export default function Historique() {


    return (
        <>
            <Navbar isAuthenticated={undefined} />
            <h1>Historique</h1>
        </>
    );
}
// connection a la base de donnée


