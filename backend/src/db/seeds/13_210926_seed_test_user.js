export async function up({ context: queryInterface, _Sequelize }) {
  await queryInterface.bulkInsert('users', [
    {
      first_name: 'Jane',
      last_name: 'Doe',
      role: 'engineer',
      username: 'JaneDoe',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}

export async function down({ context: queryInterface, _Sequelize }) {
  await queryInterface.bulkDelete('users', { username: 'JaneDoe' })
}
