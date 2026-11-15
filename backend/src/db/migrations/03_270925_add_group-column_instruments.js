import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.addColumn('instruments', 'group', {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'N/A',
  })
}
export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn('instruments', 'group')
}
