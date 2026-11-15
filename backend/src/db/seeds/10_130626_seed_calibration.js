export async function up({ context: queryInterface, _Sequelize }) {
  await queryInterface.bulkInsert('calibrations', [
    {
      instrument_id: 3,
      calibration_date: '2026-06-13',
      due_date: '2027-06-13',
      performed_by: 'Matti Meikäläinen',
      certificate_path: 'uploads/calibrations/sample.pdf',
      comment: 'Instrument fullfils criteria, calibration ok',
      created_at: new Date(),
    },
  ])
}

export async function down({ context: queryInterface, _Sequelize }) {
  await queryInterface.bulkDelete('calibrations', null, {})
}
