// server.js (ou tout autre nom de fichier que vous utilisez pour votre serveur)

const express = require('express');
const bodyParser = require('body-parser');
const ActiveDirectory = require('activedirectory');
const cors = require('cors');

const app = express();
const port = 3001;

// Configuration de Active Directory
const adConfig = {
    url: 'ldap://IREDOM.local',
    baseDN: 'dc=IREDOM,dc=local', // Base DN de votre Active Directory
    username: 'IREDOM\\svc_sqldbrd', // Nom d'utilisateur avec les droits pour lire l'AD
    password: 'HeLhA.la217073=', // Mot de passe de l'utilisateur
};

const ad = new ActiveDirectory(adConfig);

// Middleware pour parser les corps de requête JSON
app.use(bodyParser.json());

app.use(cors());

// Endpoint pour l'authentification
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('username', username);

    // Authentification avec l'Active Directory
    ad.authenticate(username, password, (err, auth) => {
        if (err) {
            console.error('Erreur lors de l\'authentification : ', err);
            return res.status(500).send({ message: 'Erreur lors de l\'authentification.' });
        }

        if (auth) {
            // Authentification réussie
            console.log('Authentification réussie');
            return res.status(200).send({ message: 'Authentification réussie.' });
        } else {
            // Identifiants incorrects
            return res.status(401).send({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
