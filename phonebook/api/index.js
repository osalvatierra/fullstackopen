import express from 'express'
import config from './util/config'
import logger from './util/logger'
const app = express()

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
