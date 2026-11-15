import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (transaction) => {
    const opts = { transaction }

    await queryInterface.renameColumn(
      'calibrations',
      'certificate_path',
      'certificate_stored_name',
      { type: DataTypes.STRING, allowNull: true },
      opts,
    )
    await queryInterface.changeColumn(
      'calibrations',
      'comment',
      { type: DataTypes.STRING, allowNull: true },
      opts,
    )
    await queryInterface.addColumn(
      'calibrations',
      'certificate_original_name',
      { type: DataTypes.STRING, allowNull: true },
      opts,
    )
    await queryInterface.addColumn(
      'calibrations',
      'certificate_size',
      { type: DataTypes.INTEGER, allowNull: true },
      opts,
    )
    await queryInterface.addColumn(
      'calibrations',
      'created_by',
      {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
      },
      opts,
    )
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (transaction) => {
    const opts = { transaction }

    await queryInterface.removeColumn('calibrations', 'created_by', opts)
    await queryInterface.removeColumn('calibrations', 'certificate_size', opts)
    await queryInterface.removeColumn(
      'calibrations',
      'certificate_original_name',
      opts,
    )
    await queryInterface.changeColumn(
      'calibrations',
      'comment',
      { type: DataTypes.STRING, allowNull: false },
      opts,
    )
    await queryInterface.renameColumn(
      'calibrations',
      'certificate_stored_name',
      'certificate_path',
      opts,
    )
  })
}
