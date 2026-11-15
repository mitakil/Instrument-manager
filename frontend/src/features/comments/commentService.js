import api from '../../services/api'

export function getComment(instrumentId) {
  return api.get(`/comments/${instrumentId}`).then((res) => res.data)
}

export function getSubComments(commentId) {
  return api.get(`/comments/subcomments/${commentId}`).then((res) => {
    return res.data
  })
}

export function postComment(instrumentId, commentText) {
  return api
    .post(`/comments`, {
      instrumentId,
      commentText,
    })
    .then((res) => res.data)
}

export function postSubComment(commentId, commentText) {
  return api
    .post(`/comments/${commentId}/replies`, {
      commentId,
      commentText,
    })
    .then((res) => res.data)
}
