const listHelper = require("../utils/list_helper")

describe("totallikes", () => {
  const listWithOneBlog = [
    {
      title: "Title",
      author: "Author",
      likes: 5
    }
  ]

  const bigBlogList = [
    {
      title: "Title",
      author: "Author",
      likes: 5
    },
    {
      title: "Title",
      author: "Author",
      likes: 25
    },
    {
      title: "Title",
      author: "Author",
      likes: 15
    },
    {
      title: "Title",
      author: "Author",
      likes: 45
    },
  ]
  
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(([]))
    expect(result).toBe(0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(bigBlogList)
    expect(result).toBe(90)
  })
})
