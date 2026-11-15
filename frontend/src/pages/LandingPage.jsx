import { Link } from 'react-router-dom'

import useUser from '../features/auth/useUser'

export default function LandingPage() {
  const { user } = useUser()

  return (
    <div className="flex flex-col items-center mt-44">
      <h1 className="header">Welcome</h1>
      <p className="subheader">This shall be a landing page in the near future</p>
      {!user ? (
        <button className="button-primary">
          <Link to="/login">Login</Link>
        </button>
      ) : null}
    </div>
  )
}
