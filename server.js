const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/admin', express.static('admin'));

app.get('/api/links', (req, res) => {
  const links = JSON.parse(fs.readFileSync('./data/links.json'));
  res.json(links);
});

app.post('/api/update', (req, res) => {
  fs.writeFileSync('./data/links.json', JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(3000, () => console.log("✅ Serveur lancé sur http://localhost:3000"));
