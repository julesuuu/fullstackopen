import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showRemoveButton = blog.user.username === user?.username

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user ? blog.user.name : 'anonymous'}</p>
          {showRemoveButton && (
            <button
              onClick={handleDelete}
              style={{ backgroundColor: 'lightblue', borderRadius: '5px' }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog