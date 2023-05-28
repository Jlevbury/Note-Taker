const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // if your static files are in a directory named "public"

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    // read the db.json file and return all saved notes as JSON
});

app.post('/api/notes', (req, res) => {
    // receive a new note, add it to db.json, then return the new note
});

app.delete('/api/notes/:id', (req, res) => {
    // receive a query parameter containing the id of a note to delete
});
