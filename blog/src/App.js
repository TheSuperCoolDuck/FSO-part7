import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducer/notificationReducer'
import { initalizeBlogs, createBlog } from './reducer/blogReducer'

const App = () => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (expection){
      dispatch(createNotification('wrong username or password',5000))
    }
  }

  const likeBlog = (id) => {
    const blog = blogs.find(b => b.id===id)
    const changedBlog = { ...blog, likes:blog.likes+1 }

    blogService
      .update(blog.id, changedBlog)
      //.then(returnedBlog => {
      //  setBlogs(blogs.map(blog => blog.id!==id?blog:returnedBlog))
      //})
  }

  const deleteBlog = (id) => {
    blogService
      .remove(id)
      //.then(returnedId => {
      //  setBlogs(blogs.filter(blog => blog.id!==returnedId))
      //})
  }

  const addBlog = (blogObject) => {
    dispatch(createNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`,5000))
    dispatch(createBlog(blogObject))
  }

  useEffect(() => {
    dispatch(initalizeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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

  return (
    <div>
      <Notification/>
      {user===null ?
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          {blogForm()}
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={() => likeBlog(blog.id)}
              deleteBlog={() => deleteBlog(blog.id)} />
          )}
        </div>
      }
    </div>
  )
}

export default App