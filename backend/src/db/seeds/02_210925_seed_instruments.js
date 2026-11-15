export async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('instruments', [
    {
      name: 'HPLC',
      serial: 'XY-25446',
      status: 'OK',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'ICP-MS',
      serial: 'RF25CD666',
      status: 'Due',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'ICP-MS/MS',
      serial: 'RF27CD688',
      status: 'Overdue',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'pH Meter',
      serial: 'MTR-1234',
      status: 'Due',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Continuous Flow Analyzer (CFA)',
      serial: 'SKA2535',
      status: 'OK',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'KMnO4 Digester',
      serial: 'MTR-5567',
      status: 'OK',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Kjeldahl Apparatus',
      serial: 'KJ-9988',
      status: 'OK',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Discrete Analyzer',
      serial: 'SKA6768',
      status: 'OK',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Thermometer -20 - 120 C',
      serial: 'TMMR-2020',
      status: 'OK',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Thermometer 20 - 350 C',
      serial: 'TMMR-2021',
      status: 'OK',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'ICP-OES',
      serial: 'RF23CD123',
      status: 'Overdue',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}

export async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('instruments', null, {})
}
