import { commentBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, ListGroup } from 'react-bootstrap'

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
    <div className='container'>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.ur} target='_blank' rel='noreferrer'>{blog.url}</a>
      <div className='mt-2'>
        {blog.likes} likes
        <Button variant='primary' size='sm' className='ms-2' onClick={() => handleLike(blog)}>like</Button>
      </div>
      <div className='text-muted'>added by {blog.user?.name}</div>

      <h3 className='mt-4'>comments</h3>
      <Form onSubmit={addComment} className='mb-3'>
        <Form.Group className='d-flex'>
          <Form.Control
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </Form.Group>
        <Button variant='success' type='submit' className='ms-2'>add comment</Button>
      </Form>
      <ListGroup>
        {blog.comments.map((c, index) => (
          <ListGroup.Item key={index}>{c}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default BlogView