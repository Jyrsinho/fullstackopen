const mongoose = require('mongoose')

console.log(process.argv);
console.log(`name is ${process.argv[3]}`)
console.log(`number is ${process.argv[4]}`);

const password = process.argv[2]
console.log(`password: ${password}`);

const url = `mongodb+srv://tietokantaja:${password}@testi2.aphxqro.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=puhelinluettelo`

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(person)
            mongoose.connection.close();
        })
    })}

if (process.argv.length > 3) {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })


    person.save().then(result => {
        console.log('person saved!')
        console.log(result);
        mongoose.connection.close()
    })
}
