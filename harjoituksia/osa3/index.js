const express = require('express');
const app = express();

app.use(express.json());

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/api/', (req, res) => {
    res.send('<h1>Hello World !</h1>');
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    const note = req.body;
    console.log(note);
    res.json(note);
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id)

    res.status(204).end();
})

const port = 3001;
app.listen(port);
console.log(`Listening on port ${port}`);