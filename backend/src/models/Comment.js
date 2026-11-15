import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/sequelize.js'

export default class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instrument_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comments',
    tableName: 'comments',
    underscored: true,
    timestamps: true,
  },
)
