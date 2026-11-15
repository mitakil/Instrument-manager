export async function up({ context: queryInterface }) {
  const t = await queryInterface.sequelize.transaction()
  try {
    const instId = await queryInterface.rawSelect(
      'instruments',
      { where: { name: 'ICP-MS/MS' }, transaction: t },
      ['id'],
    )
    if (!instId) throw new Error('Instrument not found')

    await queryInterface.bulkUpdate(
      'instruments',
      { group: 'elem.chem', updated_at: new Date() },
      { group: 'N/A', id: instId },
      { transaction: t },
    )
    await t.commit()
  } catch (error) {
    await t.rollback()
    throw error
  }
}
