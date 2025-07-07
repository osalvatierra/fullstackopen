
import morgan from 'morgan'
import cors from 'cors'

import express from 'express'
import config from './util/config.js'
import logger from './util/logger.js'

const app = express()

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)
app.use(morgan('tiny'))
app.use(cors())




logger.info(`Server running on port ${config.PORT}`)


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error, request, response, _next) => {
  console.error('ERROR HANDLER:', error.name, error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  return response.status(500).json({ error: 'Internal Server Error' })
}

app.use(errorHandler)
