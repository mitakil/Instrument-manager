import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '../../components/Card'
import FormInput from '../../components/FormInput'
import PasswordInput from '../../components/PasswordInput'
import useUser from './useUser'

export default function Login() {
  const { login } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error_msg, setError_msg] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await login(username, password)
      navigate('/instruments', { replace: true })
    } catch (error) {
      setError_msg('Invalid credentials')
      setError_msg(error.response.data.error)
    }
  }

  useEffect(() => {
    if (error_msg) {
      const timer = setTimeout(() => setError_msg(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [error_msg])

  return (
    <div className="flex items-center justify-center h-full py-12">
      <Card title="Login" className="w-full max-w-md">
        <FormInput
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error_msg && <p className="text-red-500 text-sm mb-4">{error_msg}</p>}

        <button
          type="submit"
          onClick={onSubmit}
          className="w-full bg-primary text-white py-2 rounded-md hover:opacity-90"
        >
          Log in
        </button>
      </Card>
    </div>
  )
}
