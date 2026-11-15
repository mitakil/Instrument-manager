import 'dotenv/config'

import app from './app.js'
import logger from '../utils/logger.js'
import { connectToDatabase } from './db/sequelize.js'

async function start() {
  try {
    await connectToDatabase()

    app.listen(process.env.PORT || 3000, () => {
      logger.info(`Server running on port ${process.env.PORT || 3000}`)
    })
  } catch (err) {
    logger.error('Start up failed:', err)
    process.exit(1)
  }
}

start()
