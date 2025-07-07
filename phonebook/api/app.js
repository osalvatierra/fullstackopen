import express from 'express'
import mongoose from 'mongoose'
import config from './util/config'
import logger from './util/logger'
import middleware from './util/middleware'
import personRouter from './controllers/persons'

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

app.use(express.statis('dist'))
app.use(express.json())
app.use(middleware.reqestLogger)

app.use('/api/persons', personRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app