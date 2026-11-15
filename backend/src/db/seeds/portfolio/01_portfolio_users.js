import 'dotenv/config'
import bcrypt from 'bcrypt'

export async function up({ context: queryInterface, _Sequelize }) {
  const passwordHash = await bcrypt.hash(process.env.DEMO_PASSWORD, 10)

  await queryInterface.bulkInsert('users', [
    {
      first_name: 'Jane',
      last_name: 'Doe',
      role: 'engineer',
      username: 'janedoe',
      password_hash: passwordHash,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: 'John',
      last_name: 'Doe',
      role: 'user',
      username: 'johndoe',
      password_hash: passwordHash,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}

export async function down({ context: queryInterface, _Sequelize }) {
  await queryInterface.bulkDelete('users', { username: ['janedoe', 'johndoe'] })
}
