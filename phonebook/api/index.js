import express from 'express'
import config from './util/config.js'
import logger from './util/logger.js'
import cors from 'cors'

app.use(cors())
const app = express()

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
