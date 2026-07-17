const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`);

mongoose.connect(url, { family: 4 })
    .then(() => {
        console.log(`Connected to ${url}`);
    })
    .catch((err) => {
        console.error(err);
    })


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Name is too short']
    },
    number: {
        type: String,
        minLength: 8,
        required: [true, 'Phone number is required'],
        validate: {
            validator: (value) => {
                return /\d{2,3}-\d{5}/.test(value)
            },
            message: props => `${props.value} is not a valid phone number`
        }
}});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
