import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import blogService from './services/blogs'
import loginService from './services/login.js'
import userService from './services/users.js'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer.js'
import { initializedBlogs, createBlog, voteBlog, deleteBlog } from './reducers/blogReducer.js'
import { useUser, useUserDispatch } from './UserContext.jsx'
import Users from './components/Users.jsx'
import User from './components/User.jsx'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [allUsers, setAllUsers] = useState([])

  const user = useUser()
  const userDispatch = useUserDispatch()

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
      userDispatch({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    userService
      .getAll()
      .then(data =>
        setAllUsers(data))
  }, [])

  const match = useMatch('/users/:id')
  const userToShow = match
    ? allUsers.find(u => u.id === match.params.id)
    : null

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      userDispatch({ type: 'LOGIN', payload: user })

      setUsername('')
      setPassword('')

    } catch {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'LOGOUT' })
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
        dispatch(deleteBlog(blog.id))

        dispatch(setNotification(`delete '${blog.title}' successfully`, 'success', 5))
      } catch (exception) {
        dispatch('error could not delete the blog', 'error', 5)
      }
    }
  }

  const handleLike = async (blog) => {
    dispatch(voteBlog(blog))
    dispatch(setNotification(`you liked '${blog.title}'`, 'success', 5))
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
      <nav style={{ padding: 10, background: '#eee', marginBottom: 10 }}>
        <Link style={{ padding: 5 }} to='/'>blogs</Link>
        <Link style={{ padding: 5 }} to='/users'>users</Link>
        <span>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      </nav>
      <h2>{user === null ? 'Login to application' : 'blogs'}</h2>
      <Notification />
      <Routes>
        <Route path='users/:id' element={<User user={userToShow} />}></Route>
        <Route path='/users' element={<Users />} />
        <Route path="/" element={
          <div>
            <Togglable buttonLabel='create new blog' ref={blogFormRef} >
              <BlogForm createBlog={handleCreateBlog} />
            </Togglable>
            {sortedBlogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={() => handleLike(blog)}
                handleDelete={() => handleDelete(blog)}
              />
            )}
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App