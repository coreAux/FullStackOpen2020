const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")

const blogs =[
  {
    title: "Overreacted",
    author: "Dan Abramov",
    url: "https://overreacted.io",
    likes: 12
  },
  {
    title: "Swift by Sundell",
    author:"John Sundell",
    url: "https://www.swiftbysundell.com",
    likes: 17
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of blogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs")
  const contents = response.body.map(r => r.id)

  expect(contents).toBeDefined()
})

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Tania Rascia",
    author: "Tania Rascia",
    url: "https://www.taniarascia.com",
    likes: 9
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const contents = response.body.map(r => r.url)

    expect(response.body).toHaveLength(blogs.length + 1)
    expect(contents).toContain("https://www.taniarascia.com")
})

test("blog without likes prop defaults to 0", async () => {
  const newBlog = {
    title: "Tania Rascia",
    author: "Tania Rascia",
    url: "https://www.taniarascia.com"
    // likes: 9
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const contents = response.body.map(r => r.likes)

    expect(contents[blogs.length]).toEqual(0)
})

test("a blog without title and url props is not added", async () => {
  const newBlog = {
    // title: "Tania Rascia",
    author: "Tania Rascia",
    // url: "https://www.taniarascia.com"
    likes: 9
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)

    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(blogs.length)
})

test("deletion of a blog succeeds with status code 204 if id is valid", async () => {
  let blogsToDelete = await Blog.find({})
  blogsToDelete = blogsToDelete.map(blog => blog.toJSON())

  await api
    .delete(`/api/blogs/${blogsToDelete[0].id}`)
    .expect(204)

  const result = await Blog.find({})
  const blogsAtEnd = result.map(blog => blog.toJSON())

  expect(blogsAtEnd).toHaveLength(blogs.length - 1)

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogsToDelete[0].title)
})

test("changing a blog returns the new blog", async () => {
  let blogsAtStart = await Blog.find({})
  blogsAtStart = blogsAtStart.map(blog => blog.toJSON())

  let changedBlog = blogsAtStart[0]
  changedBlog.likes = 199

  await api
    .put(`/api/blogs/${blogsAtStart[0].id}`)
    .send(changedBlog)

  const result = await Blog.find({})
  const blogsAtEnd = result.map(blog => blog.likes)

  expect(blogsAtEnd[0]).toEqual(199)
})

afterAll(() => {
  mongoose.connection.close()
})
