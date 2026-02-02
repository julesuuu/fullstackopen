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
    </div>
  )
}

export default BlogView