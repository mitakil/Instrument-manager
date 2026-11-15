export async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('comments', [
    {
      content: 'Contamination seen, clean up precolumn and analytic column',
      user_id: 2,
      instrument_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      content: 'More filling on entry list',
      user_id: 2,
      instrument_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      content: 'lorem impsum',
      user_id: 1,
      instrument_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}

export async function down({ context: queryInterface, _Sequelize }) {
  await queryInterface.bulkDelete('comments', null, {})
}
