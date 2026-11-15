import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/sequelize.js'

export default class SubComments extends Model {}

SubComments.init(
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
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'SubComments',
    tableName: 'sub_comments',
    underscored: true,
    timestamps: true,
  },
)
