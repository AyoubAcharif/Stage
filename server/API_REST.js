const express = require('express');
const app = express();
//const upload = multer({ dest: 'uploads/' }); // Répertoire de destination pour les fichiers téléchargés

app.post('/upload', (req, res) => {
    // Gérer le fichier téléchargé ici
    console.log('Fichier reçu :', req.file);
    res.send('Fichier reçu avec succès.');
});

app.listen(5000, () => {
    console.log('Serveur API REST démarré sur le port 5000');
});
