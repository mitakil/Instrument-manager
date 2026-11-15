import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.addColumn('users', 'password_hash', {
    type: DataTypes.STRING,
    allowNull: true,
  })
  await queryInterface.addColumn('users', 'username', {
    type: DataTypes.STRING,
    allowNull: true,
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn('users', 'password_hash')
  await queryInterface.removeColumn('users', 'username')
}
