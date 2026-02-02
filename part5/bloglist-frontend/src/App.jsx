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
import BlogView from './components/BlogView.jsx'
import { Navbar, Nav, Button } from 'react-bootstrap'

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

  const blogMatch = useMatch('blogs/:id')
  const blogToShow = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
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

  const Navigation = ({ user, handleLogout }) => {
    return (
      <div className='container'>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">blogs</Nav.Link>
              <Nav.Link as={Link} to="/users">users</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-2">
                {user.name} logged in
              </Navbar.Text>
              <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
                logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

  if (user === null) {
    return (
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6' >
            <h2 className='text-center'>Log in to application</h2>
            <Notification />
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </div>
        </div>
      </div>
    )
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Navigation user={user} handleLogout={handleLogout} />
      <h2>{user === null ? 'Login to application' : 'blogs'}</h2>
      <Notification />
      <Routes>
        <Route path='blogs/:id' element={<BlogView blog={blogToShow} handleLike={handleLike} />} />
        <Route path='users/:id' element={<User user={userToShow} />}></Route>
        <Route path='/users' element={<Users />} />
        <Route path="/" element={
          <div>
            <Togglable buttonLabel='create new blog' ref={blogFormRef} >
              <BlogForm createBlog={handleCreateBlog} />
            </Togglable>
            {sortedBlogs.map(blog =>
              <div key={blog.id} style={{ padding: 5, border: '1px solid black', marginBottom: 5 }}>
                <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
              </div>
            )}
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App