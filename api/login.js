// pages/api/login.js
import ActiveDirectory from 'activedirectory2';

// Info AD
const adConfig = {
    url: 'ldap://192.168.73.9',
    baseDN: 'dc=IREDOM,dc=local',
    username: 'IREDOM\\svc_sqldbrd',
    password: 'HeLhA.la217073=',
};

const ad = new ActiveDirectory(adConfig);

export default function handler(req, res) {
    if (req.method === 'POST') {
        let { username, password } = req.body;
        username = 'IREDOM\\' + username;

        // Authentification avec l'Active Directory
        ad.authenticate(username, password, (err, auth) => {
            if (err) {
                console.error('Erreur lors de l\'authentification !!!!');
                return res.status(500).json({ message: 'Erreur lors de l\'authentification.' });
            }

            if (auth) {
                const quadri_name = username.split('\\')[1];

                ad.isUserMemberOf(quadri_name, 'G Research and Development GeGa DB Administrators', (err, isMember) => {
                    if (err) {
                        console.error('Erreur lors de la vérification de l\'appartenance au groupe.');
                        return res.status(500).json({ message: 'Erreur lors de la vérification de l\'appartenance au groupe.' });
                    }

                    if (isMember) {
                        console.log('L\'utilisateur appartient au groupe \'G Research and Development GeGa DB Administrators\'.');
                        return res.status(200).json({ message: 'Authentification réussie.' });

                    } else {
                        console.log('L\'utilisateur n\'appartient pas au groupe \'G Research and Development GeGa DB Administrators\'.');
                        return res.status(403).json({ message: 'Accès refusé.' });
                    }
                });
            } else {
                return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
