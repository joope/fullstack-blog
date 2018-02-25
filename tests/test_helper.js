const Blog = require('../models/blog');
const User = require('../models/user');
const initialBlogs = [
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
      }
];

const initialUsers = [
  { 
    _id: "5a422b3a1b54a676234d17f9",
    username: 'Kalle Käyttäjä',
    name: 'Maria Tavis',
    adult: true,
    password: 'IloveDogs',
    __v: 0
  },
  { 
    _id: "5a422aa71b54a676234d17f8",
    username: 'japadapaduu',
    name: 'Eero Neuroottinen',
    adult: false,
    password: 'singlelover96',
    __v: 0
  }
]


const format = (blog) => ({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
});


const existingId = async () => {
    const note = new Blog()
    await note.save()
  
    return note._id.toString()
  }
  
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  initialBlogs, initialUsers, format, existingId, blogsInDb, usersInDb
}