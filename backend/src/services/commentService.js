import { Sequelize } from 'sequelize'
import { Comments, Users, SubComments } from '../models/index.js'
import sequelize from '../db/sequelize.js'

async function pingService() {
  return {
    status: 'ok',
    message: 'Comment service is reachable',
    utc: new Date(Date.now()),
  }
}

async function getAllComments() {
  return Comments.findAll({
    order: [['created_at', 'DESC']],
    include: Users,
  })
}

const subCommentCount = Sequelize.literal(`(
  SELECT COUNT(*) FROM sub_comments WHERE sub_comments.comment_id = "Comments".id
  )`)

async function getComments(id) {
  return Comments.findAll({
    where: { instrument_id: id },
    order: [['created_at', 'DESC']],
    include: [
      { model: Users, attributes: ['id', 'first_name', 'last_name', 'role'] },
    ],
    attributes: {
      include: [[subCommentCount, 'subCommentCount']],
    },
  })
}

async function getSubComments(commentId) {
  return SubComments.findAll({
    where: { comment_id: commentId },
    order: [['created_at', 'DESC']],
    include: [
      { model: Users, attributes: ['id', 'first_name', 'last_name', 'role'] },
    ],
  })
}

async function postComment(instrumentId, userId, commentText) {
  try {
    const comment = await Comments.create({
      instrument_id: instrumentId,
      user_id: userId,
      content: commentText,
    })

    return await Comments.findByPk(comment.id, {
      include: [
        { model: Users, attributes: ['id', 'first_name', 'last_name', 'role'] },
      ],
    })
  } catch (error) {
    throw new Error(`Failed to create comment: ${error.message}`)
  }
}

async function postSubComment(commentId, userId, commentText) {
  try {
    const comment = await SubComments.create({
      comment_id: commentId,
      user_id: userId,
      content: commentText,
    })

    return await SubComments.findByPk(comment.id, {
      include: [
        { model: Users, attributes: ['id', 'first_name', 'last_name', 'role'] },
      ],
    })
  } catch (error) {
    throw new Error(`Failed to create comment: ${error.message}`)
  }
}

export default {
  pingService,
  getAllComments,
  getComments,
  getSubComments,
  postComment,
  postSubComment,
}
