const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')
const db = ('./db/db.json')

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
    const newNote = req.body;
    newNote.id = data.length + 1;
    data.push(newNote);

    // stringify data?

    fs.writeFile('db.json', JSON.stringify(data, null, 2), (err) => {

        if(err) {
            console.error('Error writing to db.json:', err);
            return;
        }
        res.json(db)
    })
})

// app.delete(    (req, res)=> {

// const something = (req.params.something)});







app.listen(PORT, () => {

console.log(`Server is running on http://localhost:${PORT}`)
});