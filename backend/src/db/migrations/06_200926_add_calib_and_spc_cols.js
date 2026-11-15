import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.addColumn('instruments', 'spc_status', {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'NOK',
  })

  await queryInterface.renameColumn('instruments', 'status', 'calib_status')
}

export async function down({ context: queryInterface }) {
  // rename calib_status back to status
  await queryInterface.renameColumn('instruments', 'calib_status', 'status')

  // Remove added spc_status columns
  await queryInterface.removeColumn('instruments', 'spc_status')
}
