// pages/api/userInfo.js
import ActiveDirectory from 'activedirectory2';

// Info AD
const adConfig = {
    url: 'ldap://IREDOM.local',
    baseDN: 'dc=IREDOM,dc=local',
    username: 'IREDOM\\svc_sqldbrd',
    password: 'HeLhA.la217073=',
};

const ad = new ActiveDirectory(adConfig);

export default function handler(req, res) {
    if (req.method === 'GET') {
        const username = req.query.username;

        // Récupérer les informations de l'utilisateur via Active Directory
        ad.findUser(username, function (err, user) {
            if (err) {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur :', err);
                return res.status(500).json({ message: 'Erreur lors de la récupération des informations de l\'utilisateur.' });
            }

            if (!user) {
                console.log('User: ' + username + ' not found.');
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            } else {

                return res.status(200).json({ commonName: user.cn });
            }
        });
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
