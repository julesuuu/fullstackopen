import { commentBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const BlogView = ({ blog, handleLike }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  if (!blog) return null

  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.ur} target='_blank' rel='noreferrer'>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>added by {blog.user?.name}</div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input value={comment} onChange={({ target }) => setComment(target.value)} />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView