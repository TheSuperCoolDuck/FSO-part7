import React, { useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likesBlog, createComment } from '../reducer/blogReducer'

const BlogView = ({ blogs }) => {
  const dispatch = useDispatch()

  const [ comment, setComment ] = useState('')

  const match = useRouteMatch('/blogs/:id')
  const matchedBlog = match
    ? blogs.find(b => b.id===match.params.id)
    : null

  if(!matchedBlog){
    return null
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment(matchedBlog, comment))
    setComment('')
  }

  return (
    <div>
      <h2>{matchedBlog.title} {matchedBlog.author}</h2>
      <Link to={matchedBlog.url}>{matchedBlog.url}</Link>
      <div>
        {matchedBlog.likes} likes
        <button onClick={() => dispatch(likesBlog(matchedBlog))}>
           like
        </button>
      </div>
      <div>added by {matchedBlog.user.name}</div>
      <h3>comments</h3>


      <form onSubmit={addComment}>
        <input
          id='comment'
          value = {comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button id='submit-button' type="submit">create</button>
      </form>



      <ul>
        {matchedBlog.comments.map((c , i ) =>
          <li key={i}>
            {c}
          </li>)}
      </ul>
    </div>
  )
}

export default BlogView