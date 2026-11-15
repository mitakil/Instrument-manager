export async function up({ context: queryInterface, _Sequelize }) {
  await queryInterface.bulkInsert('users', [
    {
      first_name: 'admin',
      last_name: 'istrator',
      role: 'admin',
      username: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}

export async function down({ context: queryInterface, _Sequelize }) {
  await queryInterface.bulkDelete('users', { first_name: 'admin' })
}
