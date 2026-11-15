import express, { json } from 'express'
import cors from 'cors'
import path from 'node:path'

import routes from './routes/index.js'
import { errorHandler } from './utils/middleware.js'

const app = express()

app.use(express.static('dist'))
app.use(json())
app.use(cors())

app.use('/api', routes)

app.get('*path', (req, res) => {
  res.sendFile(path.join(import.meta.dirname, '../dist/index.html'))
})

app.use(errorHandler)

export default app
