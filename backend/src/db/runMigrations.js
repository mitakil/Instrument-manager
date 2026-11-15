import { migrateUp, migrateDown, resetAllMigrations } from './migrator.js'
import logger from '../../utils/logger.js'

const action = process.argv[2] || up

if (action === 'up') {
  migrateUp()
} else if (action === 'down') {
  migrateDown()
} else if (action === 'resetAll') {
  resetAllMigrations()
} else {
  logger.error('Unknow action, use "up", "down" or "resetAll"')
}
