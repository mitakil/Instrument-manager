const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000)

export async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('comments', [
    {
      content:
        'Baseline signal to noise ratio has increased. Still within ranges, and QC-samples acceptable.',
      user_id: 2,
      instrument_id: 1,
      created_at: daysAgo(30),
      updated_at: daysAgo(30),
    },
    {
      content:
        'Done a deep cleaning on sample and skimmer cones. Salt build-up from customer XYZ high TDS samples, orifices start to wear out. Replacement set ordered',
      user_id: 2,
      instrument_id: 2,
      created_at: daysAgo(15),
      updated_at: daysAgo(15),
    },
    {
      content: 'Validation has been done, instrument status set to in use',
      user_id: 1,
      instrument_id: 3,
      created_at: daysAgo(10),
      updated_at: daysAgo(10),
    },
  ])
}

export async function down({ context: queryInterface, _Sequelize }) {
  await queryInterface.bulkDelete('comments', null, {})
}
