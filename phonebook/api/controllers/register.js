import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/users.js'

const registerRouter = express.Router()

registerRouter.post('/', async (req, res) => {
  console.log('Register request body:', req.body)

  try {
    // Validate required fields
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      console.log('Validation failed: missing fields')
      return res.json({
        status: 'error',
        error: 'Name, email, and password are required',
      })
    }

    if (password.length < 6) {
      console.log('Validation failed: password too short')
      return res.json({
        status: 'error',
        error: 'Password must be at least 6 characters',
      })
    }

    console.log('Hashing password...')
    // Hash the password
    const saltRounds = 10
    const newPassword = await bcrypt.hash(password, saltRounds)

    console.log('Creating user...')
    // Create the new user
    const newUser = await User.create({
      name,
      username: email, // Using email as username
      password: newPassword,
    })

    console.log('User created successfully:', newUser.username)
    // No need to create a separate collection - Person documents will reference this user
    // Each Person will have a user field pointing to this user's ObjectId

    res.json({ status: 'ok' })
  } catch (error) {
    console.log('Registration error:', error)

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
