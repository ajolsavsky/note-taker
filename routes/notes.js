const notes = require('express').Router();
const fs = require('fs');
const notesData = require('../db/db.json');

// GET Route for retrieving all notes
notes.get('/', (req, res) => res.json(notesData));

//POST Route
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a new note`)
    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting new note')
    }
}
)

console.log(`Here's notes.js ✏️`)

module.exports = notes;