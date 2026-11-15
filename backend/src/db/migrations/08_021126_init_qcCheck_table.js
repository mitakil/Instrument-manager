import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.createTable('qc_checks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    instrument_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    performed_by_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    qc_check_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('qc_checks')
}
