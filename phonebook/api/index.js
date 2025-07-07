import express from 'express'
import config from './util/config.js'
import logger from './util/logger.js'
const app = express()

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
