const express = require('express');

//Importing modular router for /notes
const notesRouter = require('./notes')

const app = express();

app.use('/notes', notesRouter);

console.log(`You're using index.js ✅`)

module.exports = app;