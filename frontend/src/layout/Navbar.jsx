import { Link, useNavigate } from 'react-router-dom'

import useUser from '../features/auth/useUser'
import { navigationConfig } from './navigation'

export default function Navbar() {
  const { user, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const visibleLinks = navigationConfig.links.filter((link) => {
    if (link.requiresAuth) return !!user // !! not not to convert user object for a boolean value
    return true
  })

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold text-primary">Instrument Manager</h1>
          <nav className="flex gap-4 text-sm">
            {visibleLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-gray-700 hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/about" className="text-gray-700 hover:text-primary">
            About
          </Link>
          {user ? (
            <nav className="flex gap-4 ">
              <button onClick={handleLogout} className="text-gray-700 hover:text-primary">
                Logout
              </button>
            </nav>
          ) : (
            <nav className="flex gap-4">
              <Link to="/login" className="text-gray-700 hover:text-primary">
                Login
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
