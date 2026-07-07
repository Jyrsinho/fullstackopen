import {useEffect, useState} from 'react'
import NameForm from "./NameForm.jsx";
import {Numbers} from "./Numbers.jsx";
import {isValidPerson} from "../../../../utilities/validatePerson.js";
import {Filter} from "./Filter.jsx";
import personService from "./../services/persons.js";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const selectedPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(filter.toLowerCase())
    })

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
        personService.deletePerson(personId);
        console.log(`deletePerson ${personId}`);
        const updatedPersons = persons.filter(person => person.id !== personId);
        setPersons(updatedPersons);
   }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            phone: newNumber,
        }

        if (isValidPerson(newPerson , persons) ) {
            setPersons(persons.concat(newPerson))
            personService.createPerson(newPerson)
        }else {
            alert(`${newPerson.name} already exists!`);
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