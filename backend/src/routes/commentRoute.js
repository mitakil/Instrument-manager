import { Router } from 'express'
const router = Router()

import commentController from '../controllers/commentController.js'

// Any authenticated user may use these routes, detailed information on docs/backend/permissions.md
// router.get('/', commentController.getAllComments)
router.get('/:id', commentController.getComments)
router.get('/subcomments/:id', commentController.getSubComments)
router.post('/', commentController.postComment)
router.post('/:commentId/replies', commentController.postSubComment)

export default router
