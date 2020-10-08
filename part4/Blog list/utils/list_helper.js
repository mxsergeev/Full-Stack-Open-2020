const dummy = () => 1

function totalLikes(blogs) {
  const likes = blogs.map((blog) => blog.likes)

  return blogs.length === 0
    ? 0
    : likes.reduce((prev, next) => prev + next, 0)
}

function favoriteBlog(blogs) {
  if (blogs.length === 0) return null

  const mostLikedBlog = blogs.sort((a, b) => b.likes - a.likes)[0]

  const formattedBlog = {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  }
  return formattedBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
