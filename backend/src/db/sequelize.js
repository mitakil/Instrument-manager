import 'dotenv/config'

import { Sequelize } from 'sequelize'

import logger from '../../utils/logger.js'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions:
    process.env.DB_SSL === 'true'
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
})

export async function connectToDatabase() {
  try {
    await sequelize.authenticate()
    logger.info('Database connected')
  } catch (error) {
    logger.error('Connecting database failed')
    logger.error(error)
    return process.exit(1)
  }
}

export default sequelize
