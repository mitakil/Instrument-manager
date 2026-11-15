import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/sequelize.js'

export default class Calibrations extends Model {}

Calibrations.init(
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
    calibration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    performed_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    certificate_stored_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    certificate_original_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    certificate_size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Calibrations',
    tableName: 'calibrations',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
)
