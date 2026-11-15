export async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('users', [
    {
      first_name: 'Maija',
      last_name: 'Meikäläinen',
      role: 'engineer',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}

export async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('users', null, {})
}
