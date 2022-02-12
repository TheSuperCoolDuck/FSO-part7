import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearUser } from '../reducer/loggedUserReducer'

const Navbar = ({ loggedUser }) => {

  const dispatch=useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }

  const padding = {
    padding: 5
  }

  const grey = {
    background: 'LightGray'
  }

  return (
    <div>
      <div style={grey}>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        {loggedUser
          ? <>
            {loggedUser.name} logged-in <button onClick={handleLogout}>logout</button>
          </>
          : null }
      </div>
    </div>
  )
}

export default Navbar