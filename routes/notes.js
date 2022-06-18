const notes = require('express').Router();
const fs = require('fs');
const notesData = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all notes
notes.get('/', (req, res) => res.json(notesData));

// GET route for retrieving a specific note

// DELETE route for deleting a specific note
notes.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to add a new note`)

    console.log(req.url);
    console.log(req.body);

    // const { title, text, id } = req.body;

    // console.log(title);
    // console.log(text);
    // console.log(id);

    //If all required properties are present
    // if (title && text) {
    //     //Variable for object we'll save
    //     const newNote = {
    //         title,
    //         text,
    //         id: uuidv4(),
    //     };

    //     //Obtain existing notes
    //     //??? How does err data work
    //     fs.readFile('./db/db.json', 'utf8', (err, data) => {
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             //converts string into JSON object
    //             const parsedNotes = JSON.parse(data);

    //             parsedNotes.push(newNote);

    //             fs.writeFile(
    //                 // convert back into a string
    //                 './db/db.json', JSON.stringify(parsedNotes), (writeErr) =>
    //                 writeErr
    //                 ? console.error(writeErr)
    //                 : console.info('Successfully updated notes!') 
    //             )
    //         }
    //     }
    //     )


    //     const response = {
    //         status: 'success',
    //         body: newNote,
    //     };

    //     console.log(response);
    //     res.status(201).json(response);
    // } else {
    //     res.status(500).json('Error in posting new note')
    // }
});



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
            text,
            id: uuidv4(),
        };

        //Obtain existing notes
        //??? How does err data work
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                //converts string into JSON object
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    // convert back into a string
                    './db/db.json', JSON.stringify(parsedNotes), (writeErr) =>
                    writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes!') 
                )
            }
        }
        )


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

//TODO Return updated notes array
//TODO Add unique ID to new note - use uuid npm module and require it
//TODO Add delete functionality w/ referenced id
//TODO Deploy app when functional




// CODE GRAVEYARD 💀

// notes.delete('/:note_id', (req, res) => {
//     console.info(`${req.method} request received to DELETE a note`)
//     console.log(req.body);

//     const parsedNotes = JSON.stringify(req);

//     console.log(parsedNotes);

//       const noteID = req.params.id;

      

//       console.log((` HERE IS THE REQ BODY
      
      
//       ${req.body.title}
      
      
//       `))
      
//       console.log((` HERE IS THE REQ
      
      
//       ${req.params}
      
      
//       `))

//       console.log(` HERE IS THE NOTE ID
      
      
//       ${noteID}
      
      
//       `);


//       fs.readFile('./db/db.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             //converts string into JSON object
//             const parsedNotes = JSON.parse(data);
    
//             const result = parsedNotes.filter((note) => note.note_id !==noteID);
    
//             fs.writeFile(
//                 // convert back into a string
//                 './db/db.json', JSON.stringify(result), (writeErr) =>
//                 writeErr
//                 ? console.error(writeErr)
//                 : console.info('DELETE SUCCESSFUL') 
//             )
//         }
//     });

//   })



// notes.delete('/:note_id', (req, res) => {
//     const noteID = req.params.note_id;
//     fs.readFile('./db/db.json')
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//             const result = json.filter((note) => note.note_id !== noteID);
            
//             fs.writeFile('./db/db.json', result);

//             res.json(`Item ${noteID} has been deleted 🟥`)
//         });
// });


// DELETE Route for a specific tip
// notes.delete('/:note_id', (req, res) => {
//     const noteID = req.params.note_id;
//     fs.readFile('./db/db.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         // Make a new array of all tips except the one with the ID provided in the URL
//         const result = json.filter((note) => note.note_id !== noteID);
  
//         // Save that array to the filesystem
//         fs.writeFile('./db/db.json', result);
  
//         // Respond to the DELETE request
//         res.json(`Item ${noteID} has been deleted 🗑️`);
//       });
//   });