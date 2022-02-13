import React, { useState } from 'react'

import { createNotification } from '../reducer/notificationReducer'
import { setUser } from '../reducer/loggedUserReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'

import { TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  const dispatch = useDispatch()

  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (expection){
      dispatch(createNotification('error','wrong username or password',5000))
    }
  }

  return(
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" id="login-button" type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm