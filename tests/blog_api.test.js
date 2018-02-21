const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper');

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
            likes: 2
        }
        const blogsBefore = await blogsInDb();

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            
        const blogsAfter = await blogsInDb();

        expect(blogsAfter.length).toBe(blogsBefore.length + 1);
        expect(blogsAfter).toContainEqual(newBlog);
    })

    test('posted blog without likes will default to 0 likes', async () => {
        const newBlog = {
            title: 'How I made your mother',
            author: 'Samuel Mikael Gabriel',
            url: 'http://asdasdasd.com',
        }
        const blogsBefore = await blogsInDb();

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const blogsAfter = await blogsInDb();
        
        expect(blogsAfter.length).toBe(blogsBefore.length + 1);
        expect(blogsAfter).toContainEqual({
            ...newBlog,
            likes: 0
        });
    })

    test('posted blog without title and url will fail', async () => {
        const newBlog = {
            author: 'Samuel Mikael Gabriel',
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        expect(response.body).toEqual({})
    })
})

afterAll(() => {
    server.close()
})
