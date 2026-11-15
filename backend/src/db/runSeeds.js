import { seedsUp, seedsDown, resetAllSeeds } from './seeder.js'
import logger from '../../utils/logger.js'

const action = process.argv[2] || up

if (action === 'up') {
  seedsUp()
} else if (action === 'down') {
  seedsDown()
} else if (action === 'resetAll') {
  resetAllSeeds()
} else {
  logger.error('Unknow action, use "up", "down" or "resetAll"')
}
