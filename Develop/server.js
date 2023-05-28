const express = require('express');
const fs = require ('fs');
const util = require ('util');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

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

app.post('/api/notes', async (req, res) => {
    try {
        // Step 1: Read existing notes
        const data = await readFileAsync('./db/db.json', 'utf8');
        const notes = JSON.parse(data);

        // Step 2: Prepare the new note
        const newNote = req.body;
        newNote.id = uuidv4(); // attach a unique id to our new note

        // Step 3: Add the new note to our array of notes
        notes.push(newNote);

        // Step 4: Write the updated notes back to our json file
        await writeFileAsync('./db/db.json', JSON.stringify(notes));

        // Send back the new note to the client
        res.json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving the note' });
    }
});

app.delete('/api/notes/:id', (req, res) => {
    // receive a query parameter containing the id of a note to delete
});

app.get('/api/notes', async (req, res) => {
    try {
        const data = await readFileAsync('./db/db.json', 'utf8');
        const notes = JSON.parse(data);
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error reading notes' });
    }
});
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));