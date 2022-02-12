import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const buttonLabel = viewDetails ? 'hide' : 'view'

  const handleDetailClick = () => {
    setViewDetails(!viewDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div className='blog' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} By {blog.author}
      </Link>
      <button onClick={handleDetailClick}>{buttonLabel}</button>

      {viewDetails ?
        <>
          <div>
            {blog.url}
          </div>
          <div>
          likes {blog.likes} <button id='like-button' onClick={likeBlog}>like</button>
          </div>
          <button id="delete-button" onClick={deleteBlog}>
          remove
          </button>
        </> :
        <></>}

    </div>
  )
}

Blog.propTypes={
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog