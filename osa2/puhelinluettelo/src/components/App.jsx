import {useEffect, useState} from 'react'
import NameForm from "./NameForm.jsx";
import {Numbers} from "./Numbers.jsx";
import {Filter} from "./Filter.jsx";
import personService from "./../services/persons.js";
import {findPersonByName} from "../../../../utilities/person_utilites.js";
import Notification from "./Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null);

    const selectedPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(filter.toLowerCase())
    })

    useEffect(() => {
        personService.getAll()
            .then(allPersons => {
                setPersons(allPersons);
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
           personService.deletePerson(personId)
           .then ( () => {
               const updatedPersons = persons.filter(person => person.id !== personId);
               setPersons(updatedPersons);
               showNotification({
                   type: "success",
                   message: `Successfully deleted person ${personToDelete.name}!`
               });
           })
               .catch(error => {
                   console.log(error);
                   showNotification({
                       type: "error",
                       message: `Person ${personToDelete.name} is already deleted!`,
                   })
               })
       }
   }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        }

        const existingPerson = findPersonByName(persons, newPerson.name)

        if (existingPerson) {
            editExistingPerson(existingPerson.id, newPerson);
        }else {
            createNewPerson(newPerson);
        }
    }

    const editExistingPerson = (id, editedPersonData) => {
        const editConfirmed = confirm(
            `${editedPersonData.name} already exists! Do you want to edit person?`,);
        if (editConfirmed) {
            personService.updatePerson(id, editedPersonData)
                .then(editedPerson=> {
                    const editedPersons = persons.map(person => {
                        return person.id === editedPerson.id ? editedPerson : person;
                    })
                    setPersons(editedPersons);
                    showNotification({
                            message:`successfully edited person', ${editedPersonData.name}`,
                            type: "success",
                        },
                    );
                    resetInputFields();
                })
                .catch((error, res) => {
                    console.log(error);
                    showNotification({
                        message: res.error,
                        type: "error",
                    });
                })
        }
    }

    const createNewPerson = (newPerson) =>{
        console.log('creating new Person', newPerson);
        personService.createPerson(newPerson)
        .then(newPerson => {
            console.log('newPerson from promise', newPerson);
            setPersons(persons.concat(newPerson))
            showNotification({
                message: `successfully created new person ${newPerson.name}!`,
                type: "success",
        })})
            .catch(error => {
                const errorMessage = error.response.data.error;
                showNotification({
                    message: errorMessage,
                    type: "error",
                })
            })

        resetInputFields();
    }

    const resetInputFields = () => {
        setNewName('');
        setNewNumber('');
    }

    const showNotification = (notification) => {
        setNotification(notification);
        setTimeout(() => {
            setNotification(null);
        }, 3000)
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />
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