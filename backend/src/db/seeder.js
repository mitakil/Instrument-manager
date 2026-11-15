import 'dotenv/config'

import { Umzug, SequelizeStorage } from 'umzug'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import sequelize from './sequelize.js'
import logger from '../../utils/logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function makeSeeder() {
  if (!process.env.SEED_SET) {
    logger.error(
      'SEED_SET not set, skipping seeds. Please check this, this is to protect that no un curated seeds go to portfolio',
    )
    process.exit(0)
  }

  let seed_path =
    process.env.SEED_SET === 'portfolio' ? 'seeds/portfolio/*.js' : 'seeds/*.js'
  return new Umzug({
    migrations: {
      glob: join(__dirname, seed_path),
    },
    storage: new SequelizeStorage({
      sequelize,
      tableName: 'seeds_meta',
      modelName: 'SequelizeData',
    }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
}

export async function seedsUp() {
  const seeder = makeSeeder()
  const runSeeds = await seeder.up()
  logger.info('Seeds inserted', {
    files: runSeeds.map((mig) => mig.name),
  })
}

export async function seedsDown() {
  const seeder = makeSeeder()
  const runSeeds = await seeder.down()
  logger.info('Rolled back seeds', {
    files: runSeeds.map((mig) => mig.name),
  })
}

export async function resetAllSeeds() {
  const seeder = makeSeeder()
  await sequelize.queryInterface.bulkDelete('sub_comments', null, {})
  await sequelize.queryInterface.bulkDelete('comments', null, {})
  await sequelize.queryInterface.bulkDelete('instruments', null, {})
  await sequelize.queryInterface.bulkDelete('users', null, {})
  await seeder.down({ to: 0 })
}
