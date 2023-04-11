const express = require('express');
const path = require("path")
const dbData = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = 30001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/terms', (req, res) => res.json(dbData));

app.listen(PORT, function() {
    console.log(`App is listening on Port ${PORT}`);
})