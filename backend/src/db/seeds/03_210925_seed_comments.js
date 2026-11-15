export async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('comments', [
    {
      content: 'Problems with the baseline. Check if atomizer is cloged.',
      user_id: 1,
      instrument_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      content:
        'Plasma not igniting properly, replaced the torch and checked gas flows.',
      user_id: 1,
      instrument_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      content: 'who left this so greasy??',
      user_id: 1,
      instrument_id: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}

export async function down({ context: queryInterface, _Sequelize }) {
  await queryInterface.bulkDelete('comments', null, {})
}
