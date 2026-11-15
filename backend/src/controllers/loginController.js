import loginService from '../services/loginService.js'

async function login(req, res) {
  const { username, password } = req.body
  const usr = username.trim().toLowerCase()
  const psw = password

  if (!usr || !psw)
    return res.status(400).json({ error: 'Username and password are required' })

  const user = await loginService.authenticateService(usr, psw)
  res.json({ token: user.token })
}

export default {
  login,
}
