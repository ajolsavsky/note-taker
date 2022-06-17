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

    //If all required properties are present
    if (title && text) {
        //Variable for object we'll save
        const newNote = {
            title,
            text
        };

        //Obtain existing notes
        fs.readFile('./db/db.json','utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                //converst string into JSON object
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
                    writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes!') 
                )
            }
        }
        )

        // //Converst data to string for saving
        // const noteString = JSON.stringify(newNote);

        // //Write the string to file
        // fs.writeFile(`./db/db.json`, noteString, (err) =>
        //     err
        //         ? console.error(err)
        //         : console.log(
        //             `Note has been written to JSON file`
        //         )
        // )


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