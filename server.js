const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')
const db = require('./db/db.json')
const uuid = require('./uuid')
const { readFromFile, writeToFile } = require ('./helpers/fsUtils')

// const currentTasks = require('./db/db.json');
const PORT = process.env.PORT || 3001


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json')
    .then(data => res.json (JSON.parse(data)))
// res.json(db)
});




app.post('/api/notes', (req, res) => {
    // const newNote = req.body;
    // newNote.id = data.length + 1;

    const { title, text, id } = req.body;

//   if (req.body) {
    const newNote = {

        title, 
        text, 
        id: uuid(),
    }
 
  

    db.push(newNote);
    const noteString = JSON.stringify(db)

    // stringify data?

    fs.writeFile('./db/db.json', noteString, (err) => {

        if(err) {
            console.error('Error writing to db.json:', err);
        }
        res.json(db)
    })
})

app.delete ('/api/notes/:id', (req, res)=> {
    console.log('test')
 const noteId = req.params.id;
 readFromFile('./db/db.json')
 .then((db) => {
const jsonArray = JSON.parse(db)
 
    const result = jsonArray.filter(notes => (notes.id !== noteId));

    writeToFile('./db/db.json', result);


    res.json(`Item ${noteId} has been deleted`);
    console.log()
})
});







app.listen(PORT, () => {

console.log(`Server is running on http://localhost:${PORT}`)
});