let persons = require("./persons");

const morgan = require("morgan");
const express = require('express');
const app = express();

morgan.token('postBody', function (req, res) {
    if (req.method !== "POST") return ""
    return `POST body:${JSON.stringify(req.body)} `
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :postBody"))
app.use(express.json());
app.use(express.static('dist'))

app.get('/api/info', (req, res) => {
    const infoHTML = generateInfoHTML();
    res.send(infoHTML);
})

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).json({error: 'name is required'});
    }
    if (!body.number) {
        return res.status(400).json({error: 'number is required'});
    }

    const person = {
        name: body.name,
        number: body.number,
        id: String(generateID())
    }
    persons = persons.concat(person);
    res.json(person);
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;

    const personToDelete = persons.find(person => person.id === id);
    if (!personToDelete) {
        res.status(404).json({error: 'person already deleted'});
    }

    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
})

const generateInfoHTML = () => {
    const date = new Date();
    return `
    <p>Phonebook has info for ${persons.length} persons</p>
    <p>${date}</p>
    `
}

const generateID = () => {
    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return randomIntFromInterval(1, 1000000);
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
