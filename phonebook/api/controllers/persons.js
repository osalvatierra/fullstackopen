import jwt from 'jsonwebtoken'
import express from 'express'
import Person from '../models/person.js'
import User from '../models/users.js'

const personRouter = express.Router()

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

personRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  try {
    const user = await User.findById(decodedToken.id)

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


// FIXED: GET all persons - only for logged-in user
personRouter.get('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    // Only find persons that belong to this user
    const persons = await Person.find({ user: decodedToken.id })
    response.json(persons)
  } catch (error) {
    console.error('Get persons error:', error)
    response.status(401).json({ error: 'token invalid' })
  }
})

// FIXED: GET single person - only if it belongs to current user
personRouter.get('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const person = await Person.findOne({ 
      _id: request.params.id, 
      user: decodedToken.id  // Only find if it belongs to this user
    })

    if (person) {
      response.json(person)
    } else {
      response.status(404).json({ error: 'person not found' })
    }
  } catch (error) {
    console.log(error)
    response.status(400).json({ error: 'malformatted id' })
  }
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
