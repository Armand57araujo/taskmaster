const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')

const currentTasks = require('./db/db.json');
const PORT = 3001;


app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))

)

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html')));

app.delete(    (req, res)=> {

const something = (req.params.something)});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




app.listen(PORT, () => {

console.log(`Server is running on http://localhost:${PORT}`)
});