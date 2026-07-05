export const isValidPerson = (newPerson, persons) => {

    if (persons.length !== 0) {
        const found = persons.find(person => person.name.toLowerCase().trim() === newPerson.name.toLowerCase().trim());
        return !found;
    }

    return true;

};