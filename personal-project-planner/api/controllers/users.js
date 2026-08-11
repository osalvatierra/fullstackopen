import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/users.js'

import jwt from 'jsonwebtoken'

const usersRouter = express.Router()

// Middleware to get user from token
const getUserFromToken = (request, response, next) => {
  const authorization = request.get('authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  const token = authorization.replace('Bearer ', '')

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    request.userId = decodedToken.id
    next()
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid' })
  }
}

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('persons', { name: 1, number: 1 })
  response.json(users)
})

// GET current user profile
usersRouter.get('/me', getUserFromToken, async (request, response) => {
  try {
    const user = await User.findById(request.userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    response.json({
      id: user.id,
      name: user.name,
      username: user.username,
      address: user.address,
      avatarUrl: user.avatarUrl,
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    response.status(500).json({ error: 'Failed to fetch user' })
  }
})

// PUT update user profile
usersRouter.put('/me', getUserFromToken, async (request, response) => {
  try {
    const { name, address } = request.body

    if (!name && !address) {
      return response.status(400).json({ error: 'No fields to update' })
    }

    const updatedUser = await User.findByIdAndUpdate(
      request.userId,
      {
        ...(name && { name }),
        ...(address && { address }),
      },
      { new: true },
    )

    if (!updatedUser) {
      return response.status(404).json({ error: 'User not found' })
    }

    response.json({
      id: updatedUser.id,
      name: updatedUser.name,
      username: updatedUser.username,
      address: updatedUser.address,
      avatarUrl: updatedUser.avatarUrl,
    })
  } catch (error) {
    console.error('Error updating user:', error)
    response.status(500).json({ error: 'Failed to update user' })
  }
})

export default usersRouter
