const BlogView = ({ blog, handleLike }) => {
  if (!blog) return null

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
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView