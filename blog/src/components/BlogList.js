import React from 'react'

import Blog from '../components/Blog'

import { useDispatch } from 'react-redux'

import { likesBlog, deleteBlog } from '../reducer/blogReducer'

const BlogList = ({ blogs }) => {
  const dispatch = useDispatch()

  blogs.sort((a,b) => a.likes-b.likes).reverse()

  return(
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => dispatch(likesBlog(blog))}
          deleteBlog={() => dispatch(deleteBlog(blog.id))} />
      )}
    </div>
  )
}

export default BlogList