import { useContext } from 'react'
import { UserContext } from './userContext'

export default function useUser() {
  return useContext(UserContext)
}
