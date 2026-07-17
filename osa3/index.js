require('dotenv').config();
const morgan = require("morgan");
const express = require('express');
const app = express();
const Person = require("./models/person");

morgan.token('postBody', function (req, res) {
    if (req.method !== "POST") return ""
    return `POST body:${JSON.stringify(req.body)} `
})

app.use(express.static('dist'))
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :postBody"))

app.get('/api/info', (req, res, next) => {
    Person.find({})
        .then(persons => {
            const infoHTML = generateInfoHTML(persons.length);
            res.send(infoHTML);
        })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(persons => {
            res.json(persons);
        })
        .catch(error => next(error));

})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
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
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const {name, number} = req.body;

    Person.findById(req.params.id)
    .then(person => {
        if (!person) return res.status(404).end();

        person.name = name;
        person.number = number;

        return person.save()
            .then(updatedPerson=> {
                res.json(updatedPerson);
            })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id)
    .then(result => {
        res.status(204).end()
    })
    .catch(err => next(err));
})

const generateInfoHTML = (amountOfPeople= 0) => {
    const date = new Date();
    return `
    <p>Phonebook has info for ${amountOfPeople} persons</p>
    <p>${date}</p>
    `
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
