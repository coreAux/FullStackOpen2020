const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  let likes = body.likes ? body.likes : 0

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
