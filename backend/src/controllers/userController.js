import userService from '../services/userService.js'
import logger from '../../utils/logger.js'
import bcrypt from 'bcrypt'

async function ping(_req, res, next) {
  try {
    const response = await userService.pingService()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

async function getUsers(req, res) {
  try {
    const result = await userService.listAll()
    res.json(result)
  } catch (error) {
    logger.error('Something wrong on getUsers', error)
  }
}

async function postUser(req, res) {
  try {
    const { firstName, lastName, role, password, username } = req.body

    const passwordHash = await bcrypt.hash(password, 10)

    const response = await userService.createUser(
      firstName,
      lastName,
      role,
      passwordHash,
      username,
    )
    res.status(201).json(response)
  } catch (error) {
    logger.error('Problems creating user', error)
  }
}

export default {
  ping,
  getUsers,
  postUser,
}
