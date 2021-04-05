const listHelper = require("../utils/list_helper")

describe("favoriteblog", () => {
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
    {
      title: "Title",
      author: "Author",
      likes: 43
    },
  ]

  test("of empty list is zero", () => {
    const result = listHelper.favoriteBlog(([]))
    expect(result).toEqual(0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(
      {
        title: "Title",
        author: "Author",
        likes: 5
      }
    )
  })

  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(bigBlogList)
    expect(result).toEqual(
      {
        title: "Title",
        author: "Author",
        likes: 45
      }
    )
  })
})
