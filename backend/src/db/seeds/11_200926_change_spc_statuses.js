export async function up({ context: queryInterface }) {
  await queryInterface.bulkUpdate(
    'instruments',
    { spc_status: 'OK' },
    {
      name: 'HPLC',
    },
  )
}

export async function down({ context: queryInterface }) {
  await queryInterface.bulkUpdate(
    'instruments',
    { spc_status: 'NOK' },
    {
      name: 'HPLC',
    },
  )
}
