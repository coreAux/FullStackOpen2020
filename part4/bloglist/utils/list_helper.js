const dummy = (blogPosts) => {
  return 1
}

const totalLikes = (blogPosts) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogPosts.length === 0
  ? 0
  : blogPosts.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const indexMostLikes = blogs.reduce((iMax, x, i, arr) => (x.likes > arr[iMax].likes ? i : iMax), 0)

  return blogs.length === 0
  ? 0
  : blogs[indexMostLikes]
}

const mostBlogs = (blogs) => {
  let compareArr = []
  let authorArr = []

  blogs.forEach((el) => {
    if (compareArr.includes(el.author) === false) {
      compareArr.push(el.author)
      authorArr.push({author: el.author, blogs: 0})
    }
  })

  blogs.forEach((el) => {
    let newArrIndex = authorArr.findIndex((e) => e.author === el.author)
    authorArr[newArrIndex].blogs += 1
  })

  const indexMostBlogs = authorArr.reduce((iMax, x, i, arr) => (x.blogs > arr[iMax].blogs ? i : iMax), 0)

  return authorArr.length === 0
  ? 0
  : authorArr[indexMostBlogs]
}

const mostLikes = (blogs) => {
  let compareArr = []
  let authorArr = []

  blogs.forEach((el) => {
    if (compareArr.includes(el.author) === false) {
      compareArr.push(el.author)
      authorArr.push({author: el.author, likes: 0})
    }
  })

  blogs.forEach((el) => {
    let newArrIndex = authorArr.findIndex((e) => e.author === el.author)
    authorArr[newArrIndex].likes += el.likes
  })

  const indexMostBlogs = authorArr.reduce((iMax, x, i, arr) => (x.likes > arr[iMax].likes ? i : iMax), 0)

  return authorArr.length === 0
  ? 0
  : authorArr[indexMostBlogs]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
