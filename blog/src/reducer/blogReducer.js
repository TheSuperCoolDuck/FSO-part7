/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const reducer = (state=[], action) => {
  switch(action.type){
  case 'INIT_BLOG':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'VOTE_BLOG':
    const id = action.data
    const blogToChange = state.find(b => Number(b.id)===id)
    const changedBlog = {
      ...blogToChange,
      votes: blogToChange.votes+1
    }
    return state.map(blog =>
      blog.id!==id ? blog: changedBlog)
  case 'DELETE_BLOG':
    console.log(action.data)
    return state.filter(b => Number(b.id)!==action.data)
  default:
    return state
  }
}

export const initalizeBlogs= content => {
  return async dispatch => {
    const newBlog = await blogService.getAll(content)
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

export const voteBlog=(blogId) => {
  return async dispatch => {
    dispatch({
      type: 'VOTE_BLOG',
      data: blogId
    })
  }
}

export const deleteBlog=(blogId) => {
  return async dispatch => {
    dispatch({
      type: 'DELETE_BLOG',
      data: blogId
    })
  }
}

export default reducer