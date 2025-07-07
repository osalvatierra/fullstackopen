import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
console.log('connecting to', url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minLength: [3, 'Name must be at least 3 characters.'],
  },
  number: {
    type: String,
    required: [true, 'Phone number is required.'],
    validate: {
      validator: function (v) {
        return /^\d{3}-\d{3}-\d{4}$/.test(v)
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Use format XXX-XXX-XXXX.`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)
export default Person
