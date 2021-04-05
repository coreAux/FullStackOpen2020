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
      author: "Author1",
      likes: 5
    },
    {
      title: "Title",
      author: "Author2",
      likes: 25
    },
    {
      title: "Title",
      author: "Author2",
      likes: 15
    },
    {
      title: "Title",
      author: "Author1",
      likes: 45
    },
    {
      title: "Title",
      author: "Author3",
      likes: 432
    },
    {
      title: "Title",
      author: "Author1",
      likes: 45
    },
  ]

  test("of empty list is zero", () => {
    const result = listHelper.mostLikes(([]))
    expect(result).toEqual(0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(
      {
        author: "Author",
        likes: 5
      }
    )
  })

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostLikes(bigBlogList)
    expect(result).toEqual(
      {
        author: "Author3",
        likes: 432
      }
    )
  })
})
