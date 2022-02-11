import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likesBlog } from '../reducer/blogReducer'

const BlogView = ({ blogs }) => {
  const dispatch = useDispatch()

  const match = useRouteMatch('/blogs/:id')
  const matchedBlog = match
    ? blogs.find(b => b.id===match.params.id)
    : null

  if(!matchedBlog){
    return null
  }

  console.log(matchedBlog)

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
    </div>
  )
}

export default BlogView