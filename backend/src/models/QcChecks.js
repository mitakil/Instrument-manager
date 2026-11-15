import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/sequelize.js'

export default class QcChecks extends Model {}

QcChecks.init(
  {
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
      validate: { isIn: [['OK', 'NOK']] },
    },
  },
  {
    sequelize,
    modelName: 'QcChecks',
    tableName: 'qc_checks',
    underscored: true,
    timestamps: true,
  },
)
