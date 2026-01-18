const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
  console.log('🚀 ~ favoriteBlog ~ favorite:', favorite)

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = _.countBy(blogs, 'author')
  console.log('🚀 ~ mostBlogs ~ authorCounts:', authorCounts)

  const authorArray = _.map(authorCounts, (count, author) => ({
    author: author,
    blogs: count
  }))
  console.log('🚀 ~ mostBlogs ~ authorArray:', authorArray)

  return _.maxBy(authorArray, 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return

  const groupedAuthors = _.groupBy(blogs, 'author')
  console.log('🚀 ~ mostLikes ~ groupedAuthors:', groupedAuthors)

  const authorLikesArray = _.map(groupedAuthors, (authorBlogs, author) => {
    return {
      author: author,
      likes: _.sumBy(authorBlogs, 'likes')
    }
  })
  console.log('🚀 ~ mostLikes ~ authorLikesArray:', authorLikesArray)

  return _.maxBy(authorLikesArray, 'likes')
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}