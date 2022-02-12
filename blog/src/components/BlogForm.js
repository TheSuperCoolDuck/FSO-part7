import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createNotification } from '../reducer/notificationReducer'
import { createBlog } from '../reducer/blogReducer'

import Togglable from '../components/Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }

    dispatch(createNotification(`a new blog ${blog.title} by ${blog.author} added`,5000))
    dispatch(createBlog(blog))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel='create new blog'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title
          <input
            id='title'
            value = {title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>author
          <input
            id='author'
            value = {author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>url
          <input
            id='url'
            value = {url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id='submit-button' type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm