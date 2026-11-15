export async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('sub_comments', [
    {
      content: 'Atomizer cleaned according SOP, baseline stable again.',
      user_id: 2,
      comment_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}

export async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('sub_comments', null, {})
}
