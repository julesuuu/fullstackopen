import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import blogService from './services/blogs'
import loginService from './services/login.js'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer.js'
import { initializedBlogs, createBlog } from './reducers/blogReducer.js'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializedBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      console.log('🚀 ~ :24 ~ handleLogin ~ user:', user)

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')

    } catch {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }

  const handleLogout = () => {

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))

      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} is added`, 'success', 5))

    } catch (exception) {
      dispatch(setNotification('error creating blog', 'error', 5))
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)

        setBlogs(blogs.filter(b => b.id !== blog.id))

        dispatch(setNotification(`delete '${blog.title}' successfully`, 'success', 5))
      } catch (exception) {
        dispatch('error could not delete the blog', 'error', 5)
      }
    }
  }

  const handleLike = async (blog) => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    try {
      const returnedBlog = await blogService.update(blog.id, blogToUpdate)

      const blogWithUser = {
        ...returnedBlog,
        user: blog.user
      }
      setBlogs(blogs.map(b => (b.id !== blog.id ? b : blogWithUser)))
      dispatch(setNotification(`you liked '${blog.title}'`, 'success', 5))
    } catch (exception) {
      notify('something went wrong', 'error', exception)
      dispatch(setNotification(`something went wrong liking '${blog.title}'`, 'error', 5))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />

        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>{user === null ? 'Login to application' : 'blogs'}</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef} >
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleDelete={() => handleDelete(blog)}
          user={user}
        />
      )}
    </div>
  )
}

export default App