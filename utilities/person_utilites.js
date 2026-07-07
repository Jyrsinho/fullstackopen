export const findPersonByName = (persons, name) => {

    if (persons.length === 0) {
        return null;
    }
    return persons.find(person => person.name.toLowerCase().trim() === name.toLowerCase().trim());

};