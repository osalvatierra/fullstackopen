import app from './app.js'
import config from './util/config.js'
import logger from './util/logger.js'

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
