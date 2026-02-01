import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => 
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializedBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const voteBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    dispatch(updateBlog(returnedBlog))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer