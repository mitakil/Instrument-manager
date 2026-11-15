import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (transaction) => {
    const opts = { transaction }

    await queryInterface.changeColumn(
      'calibrations',
      'certificate_stored_name',
      { type: DataTypes.STRING, allowNull: true },
      opts,
    )
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (transaction) => {
    const opts = { transaction }

    await queryInterface.changeColumn(
      'calibrations',
      'certificate_stored_name',
      { type: DataTypes.STRING, allowNull: false },
      opts,
    )
  })
}
