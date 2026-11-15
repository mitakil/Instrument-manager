import multer from 'multer'
import { randomUUID } from 'node:crypto'

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? '/app/uploads'

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${randomUUID()}.pdf`),
})

export const uploadCertificate = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, file.mimetype === 'application/pdf'),
}).single('certificate')
