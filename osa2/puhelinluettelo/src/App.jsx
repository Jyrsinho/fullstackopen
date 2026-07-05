import {useState} from 'react'
import NameForm from "./NameForm.jsx";
import {Numbers} from "./Numbers.jsx";
import {isValidPerson} from "../../../utilities/validatePerson.js";


const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            phone: '0123456789',
        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')


   const handleNameChange = (event) => {
        setNewName(event.target.value)
   }

   const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
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
            <NameForm handleNameChange={handleNameChange}
                      handleNumberChange={handleNumberChange}
                      newName={newName}
                      newNumber={newNumber}
                      onSubmit={handleSubmit} />
            <Numbers persons={persons} />
        </div>
    )

}

export default App