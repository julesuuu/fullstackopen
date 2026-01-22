import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import blogService from './services/blogs'
import loginService from './services/login.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const blogFormRef = useRef( )
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
    }, 5000);
  }

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
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      const blogToDisplay = {
        ...returnedBlog,
        user: {
          name: user.name,
          username: user.username,
          id: returnedBlog.user
        }
      }

      blogFormRef.current.toggleVisibility()

      setBlogs([...blogs, blogToDisplay])
      notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)

    } catch (exception) {
      console.log('Error creating blog', exception)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)

        setBlogs(blogs.filter(b => b.id !== blog.id))

        notify(`Deleted ${blog.title}`)
      } catch (exception) {
        notify('Error could not delete the blog', 'error', exception)
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
    } catch (exception) {
      notify('something went wrong', 'error', exception)
    }
  }

  if (user === null) {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notification} type={notificationType} />
      
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
      <Notification message={notification} type={notificationType} />
      <p>
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef} >
        <BlogForm createBlog={handleCreateBlog}/>
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