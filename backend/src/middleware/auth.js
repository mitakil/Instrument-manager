import { verifyAccessToken } from '../utils/jwt.js'

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer '))
      return res.status(401).json({ error: 'Missing or not correct token' })

    const token = header.replace('Bearer ', '')
    const decodedToken = verifyAccessToken(token)
    req.user = { id: decodedToken.id, role: decodedToken.role }

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' })
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: 'Forbidden' })
    next()
  }
}
