import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import User from './components/User'
import BlogView from './components/BlogView'

import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducer/notificationReducer'
import { initalizeBlogs, createBlog, likesBlog, deleteBlog } from './reducer/blogReducer'
import { setUser ,clearUser } from './reducer/loggedUserReducer'

import { Switch, Route, Link } from 'react-router-dom'
import { initalizeUsers } from './reducer/userReducer'

const App = () => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }

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
      dispatch(createNotification('wrong username or password',5000))
    }
  }

  const addBlog = (blogObject) => {
    dispatch(createNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`,5000))
    dispatch(createBlog(blogObject))
  }

  useEffect(() => {
    dispatch(initalizeBlogs())
    dispatch(initalizeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm= () => (
    <form onSubmit={handleLogin}>
      <div>
      username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          id="password"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog'>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  blogs.sort((a,b) => a.likes-b.likes).reverse()

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

      <Notification/>

      {loggedUser===null ?
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div> :
        <>
          <h2>blogs</h2>
          <Switch>
            <Route path="/blogs/:id">
              <BlogView blogs={blogs}/>
            </Route>
            <Route path="/users/:id">
              <User users={users}/>
            </Route>
            <Route path="/users">
              <h2>Users</h2>
              <table>
                <tr>
                  <th></th>
                  <th>blogs created</th>
                </tr>
                {users.map(user =>
                  <tr key={user.id}>
                    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                    <td>{user.blogs.length}</td>
                  </tr>
                )}
              </table>
            </Route>
            <Route path="/">
              <h2>create new</h2>
              {blogForm()}
              {blogs.map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  likeBlog={() => dispatch(likesBlog(blog))}
                  deleteBlog={() => dispatch(deleteBlog(blog.id))} />
              )}
            </Route>
          </Switch>
        </>
      }
    </div>
  )
}

export default App