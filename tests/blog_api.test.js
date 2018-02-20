const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

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
]

beforeAll(async () => {
    await Blog.remove({});
    await Blog.insertMany(initialBlogs);
})

describe('GET /api/blogs', () => {
    test('blogs returned as json', async () => {
        const blogs = await api.get('/api/blogs')
        expect(blogs.ok);
    })
    
    test('blogs contains correct amount of documents', async () => {
        const blogs = await api.get('/api/blogs')
        expect(blogs.body.length).toBe(initialBlogs.length);
    })
    
    test('blogs response contains correct blog', async () => {
        const blogs = await api.get('/api/blogs')
        expect(blogs.body[0]).toEqual(initialBlogs[0])
    })
})

describe('POST /api/blogs', () => {
    test('valid blog can be posted', async () => {
        const newBlog = {
            title: 'How I made your mother',
            author: 'Samuel Mikael Gabriel',
            url: 'http://asdasdasd.com',
            likes: 0
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
        
        expect(response.body.title).toEqual(newBlog.title)
        expect(response.body.author).toEqual(newBlog.author)
        expect(response.body.url).toEqual(newBlog.url)
        expect(response.body.likes).toEqual(newBlog.likes)
    })

    test('posted blog without likes will default to 0 likes', async () => {
        const newBlog = {
            title: 'How I made your mother',
            author: 'Samuel Mikael Gabriel',
            url: 'http://asdasdasd.com',
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
        
        expect(response.body.likes).toEqual(0)
    })
})

afterAll(() => {
    server.close()
})
