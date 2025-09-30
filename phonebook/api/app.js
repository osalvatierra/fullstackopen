import express from 'express'
import mongoose from 'mongoose'
import config from './util/config.js'
import logger from './util/logger.js'
import middleware from './util/middleware.js'
import personRouter from './controllers/persons.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import registerRouter from '../controllers/register.js'

import cors from 'cors'

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log(`connected to MongoDB: ${result}`)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
