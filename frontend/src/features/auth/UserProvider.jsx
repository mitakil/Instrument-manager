import { useEffect, useMemo, useState } from 'react'
import { UserContext } from './userContext'

import api from '../../services/api'

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const login = async (username, password) => {
    try {
      const { data } = await api.post(`/login`, { username, password })

      if (!data.token) {
        throw new Error('No user data returned')
      }
      setUser(data.token)
      localStorage.setItem('token', data.token)
    } catch (error) {
      throw new Error('Error login in', error)
    }
  }

  const logout = async () => {
    try {
      //await api.post(`/login/logout`) // add this later back, but for now, we don't have a logout endpoint in the backend
    } catch {
      // Log out locally (remove user from local storage) even if server request fails
    }
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = useMemo(() => ({ user, login, logout }), [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
