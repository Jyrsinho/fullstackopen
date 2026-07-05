import {useState} from 'react'
import NameForm from "./NameForm.jsx";
import {Numbers} from "./Numbers.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleSetNewName = (e) => {
        setNewName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
        }
        setPersons(persons.concat(newPerson))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <NameForm value={newName} onChange={handleSetNewName} onSubmit={handleSubmit}/>
            <Numbers persons={persons} />
        </div>
    )

}

export default App