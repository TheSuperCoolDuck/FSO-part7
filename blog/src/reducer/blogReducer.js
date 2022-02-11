/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const reducer = (state=[], action) => {
  switch(action.type){
  case 'INIT_BLOG':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG':
    const id = action.data
    const blogToChange = state.find(b => b.id===id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes+1
    }
    return state.map(blog =>
      blog.id!==id ? blog: changedBlog)
  case 'DELETE_BLOG':
    return state.filter(b => b.id!==action.data)
  default:
    return state
  }
}

export const initalizeBlogs= () => {
  return async dispatch => {
    const newBlog = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: newBlog
    })
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likesBlog=(blogObject) => {
  return async dispatch => {
    console.log(blogObject)
    await blogService.update(blogObject.id,{ ...blogObject, likes: blogObject.likes+1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: blogObject.id
    })
  }
}

export const deleteBlog=(blogId) => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: 'DELETE_BLOG',
      data: blogId
    })
  }
}

export default reducer