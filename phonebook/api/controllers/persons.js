import express from 'express'
import Person from '../models/person.js'
import User from '../models/users.js'

const personRouter = express.Router()

personRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const user = await User.findById(body.userId)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const existingPerson = await Person.findOne({ name: body.name })

    if (existingPerson) {
      return response.status(400).json({
        error: 'Name already exists',
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
      user: user._id,
    })

    const savedPerson = await person.save()

    user.persons = user.persons.concat(savedPerson._id)
    await user.save()
    response.json(savedPerson)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

personRouter.get('/', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})
personRouter.get('/', async (request, response) => {
  try {
    const count = await Person.countDocuments({})
    const localDateTime = new Date()
    console.log(localDateTime.toString())

    const message = `Phonebook has info for ${count} people. <br/><br/>${localDateTime}`
    response.send(message)
  } catch (error) {
    response.status(500).send(`Error retrieving data from database: ${error}`)
  }
})

personRouter.get('/:id', (request, response) => {
  const id = request.params.id

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    }) // Handles invalid ObjectId format errors
})

personRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  const updatedPerson = { name, number }

  Person.findByIdAndUpdate(request.params.id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((result) => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch((error) => next(error))
})

personRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch((error) => next(error))
})

export default personRouter
