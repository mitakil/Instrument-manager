import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.createTable('calibrations', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    instrument_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'instruments',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    calibration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    performed_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificate_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  })
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('calibrations')
}
