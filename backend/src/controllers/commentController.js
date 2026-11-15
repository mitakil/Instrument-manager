import commentService from '../services/commentService.js'
import logger from '../../utils/logger.js'

async function ping(_req, res, next) {
  try {
    const response = await commentService.pingService()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

async function getAllComments(req, res) {
  try {
    const result = await commentService.getAllComments()
    res.json(result)
  } catch (error) {
    logger.error('Something wrong on getInstruments', error)
  }
}

async function getComments(req, res) {
  try {
    const result = await commentService.getComments(req.params.id)
    res.json(result)
  } catch (error) {
    logger.error('Something wrong on getInstruments', error)
  }
}

async function getSubComments(req, res) {
  try {
    const result = await commentService.getSubComments(req.params.id)
    res.json(result)
  } catch (error) {
    logger.error('Something wrong on getSubComments', error)
  }
}

async function postComment(req, res) {
  try {
    const { instrumentId, commentText } = req.body
    const userId = req.user.id

    if (!instrumentId || !userId || !commentText) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const comment = await commentService.postComment(
      instrumentId,
      userId,
      commentText,
    )
    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function postSubComment(req, res) {
  try {
    const { commentId, commentText } = req.body
    const userId = req.user.id

    if (!commentId || !userId || !commentText) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const comment = await commentService.postSubComment(
      commentId,
      userId,
      commentText,
    )
    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  ping,
  getAllComments,
  getComments,
  getSubComments,
  postComment,
  postSubComment,
}
