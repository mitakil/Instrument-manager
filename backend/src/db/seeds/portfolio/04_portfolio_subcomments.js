const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000)

export async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('sub_comments', [
    {
      content: 'Baseline stable again after changing peristaltic pump hoses.',
      user_id: 1,
      comment_id: 1,
      instrument_id: 1,
      created_at: daysAgo(15),
      updated_at: daysAgo(15),
    },
  ])
}

export async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('sub_comments', null, {})
}
