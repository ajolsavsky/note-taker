//REQUIRED PACKAGES
const express = require('express');
const path = require('path');
const api = require ('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express();


//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

//GET
//Index route - landing page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
)
//Notes route
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)

//Wildcard route
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
)


//LISTEN
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 😎`)
)