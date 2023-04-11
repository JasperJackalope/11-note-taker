const express = require('express');
const path = require("path")
const dbData = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = [];
fs.readFile('./db/db.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  notes = JSON.parse(data);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(dbData));

app.listen(PORT, function() {
    console.log(`App is listening on Port ${PORT}`);
})

