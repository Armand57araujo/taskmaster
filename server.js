const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')
const db = require('./db/db.json')
const uuid = require('./uuid')

// const currentTasks = require('./db/db.json');
const PORT = 3001;



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
res.json(db)
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

app.delete('/api/notes/:id', (req, res)=> {
 const idToDelete = req.params.id;
 
});







app.listen(PORT, () => {

console.log(`Server is running on http://localhost:${PORT}`)
});