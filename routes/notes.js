const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
const notesData = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all notes
notes.get('/', (req, res) => res.json(notesData));

// GET route for retrieving a specific note
notes.get('/:id', (req, res) => { 
    try {
        const noteId = req.params.id;

        const specificNote = notesData.filter(note => note.id === noteId)
        
        if (specificNote.length !== 0) {
            res.json(specificNote);
        } else {
            res.json("No note with that ID")
        }

    } catch (error) {
        res.json(error)
    }
});

//POST Route
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a new note`)
    console.log(req.url);
    console.log(req.body);

    const { title, text } = req.body;

    //If all required properties are present
    if (title && text) {
        //Variable for object we'll save
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        notesData.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(notesData, null, 4));
        
        const response = {
            status: 'success',
            body: newNote,
        };
        
        console.log(response);
        // fs.writeFile

        res.sendFile(path.join(__dirname, '../db/db.json'))
    } else {
        res.status(500).json('Error in posting new note')
    }
}
)

// DELETE route for deleting a specific note
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a new note`)
    console.log(req.url);
    
    const noteId = req.params.id;
    
    notesData.splice(noteId -1, 1);

    notesData.forEach((obj, i) => {
        obj.id = i + 1;
    });

    fs.writeFileSync('./db/db.json', JSON.stringify(updatedData, null, 4), function () {
        res.json(response);
    });

    const response = {
        status: 'success',
        body: updatedData,
    };
    
    console.log(response);
});


console.log(`Here's notes.js ✏️`)

module.exports = notes;