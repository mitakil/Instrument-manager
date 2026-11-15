import 'dotenv/config'

import { Umzug, SequelizeStorage } from 'umzug'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import sequelize from './sequelize.js'
import logger from '../../utils/logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function makeMigrator() {
  return new Umzug({
    migrations: {
      glob: join(__dirname, 'migrations/*.js'),
    },
    storage: new SequelizeStorage({
      sequelize,
      tableName: 'migrations_meta',
    }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
}

export async function migrateUp() {
  const migrator = makeMigrator()
  const runMigrations = await migrator.up()
  logger.info('Migrations up to date', {
    files: runMigrations.map((mig) => mig.name),
  })
}

export async function migrateDown() {
  const migrator = makeMigrator()
  const runMigrations = await migrator.down()
  logger.info('Rolled back', {
    files: runMigrations.map((mig) => mig.name),
  })
}

export async function resetAllMigrations() {
  const migrator = makeMigrator()
  await migrator.down({ to: 0 })
  await migrator.up()
}
