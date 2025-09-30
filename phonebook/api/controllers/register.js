import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/users.js'

const registerRouter = express.Router()

registerRouter.post('/', async (req, res) => {
  console.log(req.body)

  try {
    // Hash the password
    const saltRounds = 10
    const newPassword = await bcrypt.hash(req.body.password, saltRounds)

    // Create the new user
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.email,
      password: newPassword,
    })

    // No need to create a separate collection - Person documents will reference this user
    // Each Person will have a user field pointing to this user's ObjectId

    res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)

    // Handle specific MongoDB duplicate key error
    if (error.code === 11000) {
      return res.json({ status: 'error', error: 'Email already exists' })
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message)
      return res.json({ status: 'error', error: messages.join('. ') })
    }

    // Generic error
    res.json({ status: 'error', error: 'Registration failed' })
  }
})

export default registerRouter
