import React, { useEffect } from 'react'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import User from './components/User'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Navbar from './components/Navbar'

import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { initalizeBlogs } from './reducer/blogReducer'
import { setUser } from './reducer/loggedUserReducer'
import { initalizeUsers } from './reducer/userReducer'

import { Switch, Route } from 'react-router-dom'

const App = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)

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

  return (
    <div>
      <Navbar loggedUser={loggedUser}/>
      <Notification/>
      {loggedUser===null ?
        <LoginForm/> :
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
              <UserList users={users}/>
            </Route>
            <Route path="/">
              <BlogForm/>
              <BlogList blogs={blogs}/>
            </Route>
          </Switch>
        </>
      }
    </div>
  )
}

export default App