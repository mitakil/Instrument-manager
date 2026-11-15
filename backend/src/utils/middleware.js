export const errorHandler = (error, request, response, next) => {
  console.log('error', error)
  console.log('error message', error.message)
  console.log('error code', error.code)
  console.log('error name', error.name)
  console.log('error parent', error.parent)

  if (
    error.name === 'SequelizeDatabaseError' &&
    error.parent.code === '22P02'
  ) {
    return response.status(400).send({ error: 'database error' })
  }

  next(error)
}

export const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
