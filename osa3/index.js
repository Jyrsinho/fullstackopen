require('dotenv').config();
const morgan = require("morgan");
const express = require('express');
const app = express();
const Person = require("./models/person");

morgan.token('postBody', function (req, res) {
    if (req.method !== "POST") return ""
    return `POST body:${JSON.stringify(req.body)} `
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :postBody"))
app.use(express.json());
app.use(express.static('dist'))

app.get('/api/info', (req, res) => {
    Person.find({})
        .then(persons => {
            const infoHTML = generateInfoHTML(persons.length);
            res.send(infoHTML);
        })
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons);
        })
        .catch(err => console.log(err));

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

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    });

    newPerson.save()
        .then(addedPerson=> {
            res.json(addedPerson);
        })
        .catch(err => {
            console.log(err);
        })
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

const generateInfoHTML = (amountOfPeople= 0) => {
    const date = new Date();
    return `
    <p>Phonebook has info for ${amountOfPeople} persons</p>
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
