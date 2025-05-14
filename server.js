const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Sert les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// 👉 Rediriger la racine vers index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API pour récupérer les liens
app.get('/api/links', (req, res) => {
  const links = JSON.parse(fs.readFileSync('./data/links.json'));
  res.json(links);
});

// API pour mettre à jour les liens
app.post('/api/update', (req, res) => {
  fs.writeFileSync('./data/links.json', JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(3000, () => console.log("✅ Serveur lancé sur http://localhost:3000"));
