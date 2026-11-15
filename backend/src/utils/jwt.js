import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

export function signAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET)
}

export function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET)
}
