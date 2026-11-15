import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/sequelize.js'

export default class Instruments extends Model {}

Instruments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serial: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    spc_status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NOK',
      validate: { isIn: [['OK', 'NOK']] },
    },
    calib_status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NOK',
      validate: { isIn: [['OK', 'Due', 'NOK']] },
    },
    group: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'N/A',
    },
    asset_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    instrument_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    software: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    software_version: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    calibration_frequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 12,
      validate: { isIn: [[3, 6, 12]] },
    },
    instrument_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'in_use',
      validate: { isIn: [['in_use', 'out_of_service', 'retired']] },
    },
  },
  {
    sequelize,
    modelName: 'Instruments',
    tableName: 'instruments',
    underscored: true,
    timestamps: true,
  },
)
