const listHelper = require('../utils/list_helper')
const blogsForTests = require('./utils/blogs_for_tests')

const listWithOneBlog = [blogsForTests[0]]

test('Dummy returns one', () => {
  const blogs = []
  const received = listHelper.dummy(blogs)

  expect(received).toBe(1)
})

describe('Total likes', () => {
  test('of empty list is zero', () => {
    const received = listHelper.totalLikes([])

    expect(received).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const received = listHelper.totalLikes(listWithOneBlog)

    expect(received).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const received = listHelper.totalLikes(blogsForTests)

    expect(received).toBe(36)
  })
})

describe('Favorite blog', () => {
  test('of empty list is null', () => {
    const received = listHelper.favoriteBlog([])

    expect(received).toBe(null)
  })

  test('when list has only one blog, is the blog itself', () => {
    const received = listHelper.favoriteBlog(listWithOneBlog)
    const expected = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    }

    expect(received).toEqual(expected)
  })

  test('of a bigger list is returned right', () => {
    const received = listHelper.favoriteBlog(blogsForTests)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }

    expect(received).toEqual(expected)
  })
})
