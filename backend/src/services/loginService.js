import { findByUsername } from './userService.js'
import { signAccessToken } from '../utils/jwt.js'

import bcrypt from 'bcrypt'

async function authenticateService(username, password) {
  const user = await findByUsername(username)
  if (!user || !user.password_hash) {
    throw Object.assign(new Error('Invalid credentials'), { status: 401 })
  }
  if (!(await bcrypt.compare(password, user.password_hash))) {
    throw Object.assign(new Error('Invalid credentials'), { status: 401 })
  }

  const token = signAccessToken({
    id: user.id,
    username: user.username,
    role: user.role,
  })

  return {
    token,
  }
}

export default {
  authenticateService,
}
