import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.addColumn('instruments', 'asset_id', {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  })
  await queryInterface.addColumn('instruments', 'instrument_location', {
    type: DataTypes.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('instruments', 'manufacturer', {
    type: DataTypes.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('instruments', 'model', {
    type: DataTypes.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('instruments', 'software', {
    type: DataTypes.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('instruments', 'software_version', {
    type: DataTypes.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('instruments', 'calibration_frequency', {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 12,
  })
  await queryInterface.addColumn('instruments', 'instrument_status', {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'in_use',
  })
}

export async function down({ context: queryInterface }) {
  const columns = [
    'instrument_status',
    'calibration_frequency',
    'software_version',
    'software',
    'model',
    'manufacturer',
    'instrument_location',
    'asset_id',
  ]
  for (const column of columns) {
    await queryInterface.removeColumn('instruments', column)
  }
}
