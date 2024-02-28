const express = require('express');
const bodyParser = require('body-parser');
const ActiveDirectory = require('activedirectory2');
const cors = require('cors');
const sql = require('msnodesqlv8');
const app = express();
const port = 3001;
const connexion_db = require('./db');

// Info AD
const adConfig = {
    url: 'ldap://IREDOM.local',
    baseDN: 'dc=IREDOM,dc=local',
    username: 'IREDOM\\svc_sqldbrd',
    password: 'HeLhA.la217073=',
};

const ad = new ActiveDirectory(adConfig);


app.use(bodyParser.json()); //pour avoir une réponse en json
app.use(cors()); //pour autoriser les requêtes cross-origin


app.post('/api/login', (req, res) => {
    var { username, password } = req.body;

    // rajouter nom de domaine devant le nom d'utilisateur
    username = 'IREDOM\\' + username;

    // Authentification avec l'Active Directory
    ad.authenticate(username, password, (err, auth) => {
        if (err) {
            console.error('Erreur lors de l\'authentification !!!!');
            return res.status(500).send({ message: 'Erreur lors de l\'authentification.' });
        }

        if (auth) {
            // Vérifie si l'utilisateur appartient au groupe 'G Research...'

            const quadri_name = username.split('\\')[1];

            //voir doc: npmjs.com

            ad.isUserMemberOf(quadri_name, 'G Research and Development GeGa DB Administrators', (err, isMember) => {
                if (err) {
                    console.error('Erreur lors de la vérification de l\'appartenance au groupe.');
                    return res.status(500).send({ message: 'Erreur lors de la vérification de l\'appartenance au groupe.' });
                }

                if (isMember) {
                    console.log('L\'utilisateur appartient au groupe \'G Research and Development GeGa DB Administrators\'.');



                    connexion_db(username, password, (err) => {
                        if (err) {
                            console.error('Erreur lors de la connexion à la base de données:', err);
                            return res.status(500).send({ message: 'Erreur de connexion à la base de données.' });
                        }
                        console.log('Connecté à la base de données avec succès');

                        return res.status(200).send({ message: 'Authentification et connexion à la base de données réussies.' });
                    });
                    return res.status(200).send({ message: 'Authentification réussie.' });
                } else {
                    console.log('L\'utilisateur n\'appartient pas au groupe \'G Research and Development GeGa DB Administrators\'.');
                    return res.status(403).send({ message: 'Accès refusé.' });
                }
            });
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
