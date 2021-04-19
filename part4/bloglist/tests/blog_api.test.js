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

afterAll(() => {
  mongoose.connection.close()
})
