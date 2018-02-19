const listHelper = require('../utils/list_helper')
const manyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
];

const singleBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
];

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has zero blogs it should equal zero likes', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  })

  test('when list has 1 blog it should equal likes of that blog', () => {
    const result = listHelper.totalLikes(singleBlog);
    expect(result).toBe(7);
  })

  test('when list has multiple blogs it should equal the likes of everyone', () => {
    const result = listHelper.totalLikes(manyBlogs);
    expect(result).toBe(36);
  })
})

describe('favorite blog', () => {
  test('it should return the most liked blog', () => {
    const result = listHelper.favoriteBlog(manyBlogs);
    expect(result).toEqual(manyBlogs[2]);
  })

  test('it should return the blog if there is only one', () => {
    const result = listHelper.favoriteBlog(singleBlog);
    expect(result).toEqual(singleBlog[0]);
  })
})

describe('most blogs', () => {
  test('should return the author with most blogs from given list', () => {
    const result = listHelper.mostBlogs(manyBlogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('it should return only blog if there is only one', () => {
    const result = listHelper.mostBlogs(singleBlog);
    expect(result).toEqual({
      author: 'Michael Chan',
      blogs: 1
    });
  })
})

describe('most likes', () => {
  test('should return the author with most blogs from given list', () => {
    const result = listHelper.mostLikes(manyBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

  test('it should return only blog if there is only one', () => {
    const result = listHelper.mostLikes(singleBlog);
    expect(result).toEqual({
      author: 'Michael Chan',
      likes: 7
    });
  })
})