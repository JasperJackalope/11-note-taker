const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse incoming JSON requests
app.use(express.json());

// Load existing notes from file
let notes = [];
fs.readFile('./db/db.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  notes = JSON.parse(data);
});

// API endpoints for getting and posting notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(newNote);
  fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf8', err => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save note' });
    } else {
      res.json(newNote);
    }
  });
});

// Serve the notes page for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex(note => note.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
    fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf8', err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete note' });
      } else {
        res.sendStatus(204);
      }
    });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});