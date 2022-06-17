const notes = require('express').Router();
const fs = require('fs');
const notesData = require('../db/db.json');

// GET Route for retrieving all notes
notes.get('/', (req, res) => res.json(notesData));

console.log(`Here's notes.js ✏️`)

module.exports = notes;