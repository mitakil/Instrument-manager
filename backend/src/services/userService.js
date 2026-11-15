import { Users, Comments } from '../models/index.js'

export async function findByUsername(username) {
  return Users.findOne({
    where: { username },
  })
}

async function pingService() {
  return {
    status: 'ok',
    message: 'User service is reachable',
    utc: new Date(Date.now()),
  }
}

async function listAll() {
  return Users.findAll({
    order: [['created_at', 'DESC']],
    include: Comments,
  })
}

async function createUser(firstName, lastName, role, passwordHash, username) {
  const userExisting = await findByUsername(username)
  if (userExisting) {
    throw Object.assign(new Error('Username already exists'), { status: 409 })
  }
  try {
    const user = await Users.create({
      first_name: firstName,
      last_name: lastName,
      role: role,
      password_hash: passwordHash,
      username: username,
    })

    return await Users.findByPk(user.id)
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`)
  }
}

export default {
  pingService,
  listAll,
  createUser,
}
