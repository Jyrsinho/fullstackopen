import {Person} from "./Person.jsx";

export function Numbers({persons, handleDeletePerson}) {
    if (persons.length === 0) return null;
    return (
        <div>
            <h2>Numbers: </h2>
            {persons.map((person) => (
                <Person key={person.name} person={person} handleDelete={() => handleDeletePerson(person.id)}/>
            ))}
        </div>

    )
}