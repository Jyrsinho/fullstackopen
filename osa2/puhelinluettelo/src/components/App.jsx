import {useEffect, useState} from 'react'
import NameForm from "./NameForm.jsx";
import {Numbers} from "./Numbers.jsx";
import {isValidPerson} from "../../../../utilities/validatePerson.js";
import {Filter} from "./Filter.jsx";
import axios from 'axios';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const selectedPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(filter)
    })

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(res => {
                console.log(res)
                setPersons(res.data)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            phone: newNumber,
        }

        if (isValidPerson(newPerson , persons) ) {
            setPersons(persons.concat(newPerson))
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
            <Numbers persons={selectedPersons}/>
        </div>
    )

}

export default App