import {useEffect, useState} from 'react'
import NameForm from "./NameForm.jsx";
import {Numbers} from "./Numbers.jsx";
import {Filter} from "./Filter.jsx";
import personService from "./../services/persons.js";
import {findPersonByName} from "../../../../utilities/person_utilites.js";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const selectedPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(filter.toLowerCase())
    })
    console.log('selected persons', selectedPersons);

    useEffect(() => {
        personService.getAll()
            .then(response => {
                setPersons(response.data);
            })
    }, [])



   const handleNameChange = (event) => {
        setNewName(event.target.value)
   }

   const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
   }

   const handleFilterChange = (event) => {
        setFilter(event.target.value)
   }

   const handleDeletePerson = (personId) => {
        const personToDelete = persons.find(person => person.id === personId);
        const userConfirmedDelete = confirm(
            `Are you sure you want to delete person ${personToDelete.name}?`);

        if (userConfirmedDelete) {
            personService.deletePerson(personId);
            const updatedPersons = persons.filter(person => person.id !== personId);
            setPersons(updatedPersons);
        }
   }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            phone: newNumber,
        }

        const existingPerson = findPersonByName(persons, newPerson.name)

        if (existingPerson) {
            editExistingPerson(existingPerson.id, newPerson);
        }else {
            createNewPerson(newPerson);
        }
    }

    const createNewPerson = (newPerson) =>{
        personService.createPerson(newPerson)
        .then(response => {
            setPersons(persons.concat(response.data))
        })
    }

    const editExistingPerson = (id, newPersonData) => {
        const editConfirmed = confirm(
            `${newPersonData.name} already exists! Do you want to edit person?`,);
        if (editConfirmed) {
            personService.updatePerson(id, newPersonData)
                .then(response => {
                    console.log(`update respons: ${response.data}`);
                    const editedPersons = persons.map(person => {
                        return person.id === id ? response.data : person;
                    })
                    setPersons(editedPersons);
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} onChange={handleFilterChange}/>
            <NameForm handleNameChange={handleNameChange}
                      handleNumberChange={handleNumberChange}
                      newName={newName}
                      newNumber={newNumber}
                      onSubmit={handleSubmit}/>
            <Numbers persons={selectedPersons}
                     handleDeletePerson={handleDeletePerson}/>
        </div>
    )

}

export default App