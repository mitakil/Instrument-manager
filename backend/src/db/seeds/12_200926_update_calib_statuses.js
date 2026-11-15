export async function up({ context: queryInterface }) {
  await queryInterface.bulkUpdate(
    'instruments',
    { calib_status: 'NOK' },
    {
      id: [3, 11],
    },
  )
}

export async function down({ context: queryInterface }) {
  await queryInterface.bulkUpdate(
    'instruments',
    { calib_status: 'Overdue' },
    {
      id: [3, 11],
    },
  )
}
