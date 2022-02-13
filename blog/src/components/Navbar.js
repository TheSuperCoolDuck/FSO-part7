import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearUser } from '../reducer/loggedUserReducer'
import { AppBar, Toolbar, Button } from '@material-ui/core'

const Navbar = ({ loggedUser }) => {

  const dispatch=useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to="/">
          blogs
        </Button>
        <Button color='inherit' component={Link} to="/users">
          users
        </Button>
        {loggedUser
          ? <>
            {loggedUser.name} logged-in <Button variant='contained'  onClick={handleLogout}>logout</Button>
          </>
          : null }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar