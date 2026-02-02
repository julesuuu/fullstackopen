import { ListGroup, Badge } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div className="mt-4">
      <h2 className="mb-1">{user.name}</h2>
      <div className="text-muted mb-4">
        Total blogs added: <Badge bg="info">{user.blogs.length}</Badge>
      </div>

      <h3>Added Blogs</h3>
      <ListGroup className="mt-3">
        {user.blogs.map(blog => (
          <ListGroup.Item key={blog.id}>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {user.blogs.length === 0 && (
        <p className="text-muted mt-2">This user hasn't added any blogs yet.</p>
      )}
    </div>
  )
}

export default User