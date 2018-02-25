const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, existingId, blogsInDb } = require('./test_helper');

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

describe('DELETE /api/blogs/<post-id>', () => {
    test('deleted blog doesnt appear on blogs list', async () => {
        const blogId = await existingId();
        const blogsBefore = await blogsInDb();
        const response = await api
            .delete('/api/blogs/' + blogId)
            .expect(204)

        const blogsAfter = await blogsInDb();
        expect(blogsAfter).not.toContainEqual({_id: blogId});
        expect(blogsAfter.length).toBe(blogsBefore.length - 1);
    })

    test('unvalid blog id returns a failure status from server', async () => {
        const blogId = 'notValidId'
        const blogsBefore = await blogsInDb();
        const response = await api
            .delete('/api/blogs/' + blogId)
            .expect(400)

        const blogsAfter = await blogsInDb();
        expect(blogsAfter).not.toContainEqual({_id: blogId});
        expect(blogsAfter.length).toBe(blogsBefore.length);
    })
})

describe('PUT /api/blogs/<post-id>', () => {
    test('can update existing record', async () => {
        const blog = initialBlogs[0];
        blog.title = 'I like apples';
        const res = await api
            .put('/api/blogs/' + blog._id)
            .send(blog)
            .expect(200)
        const blogsAfter = await blogsInDb();
        expect(blogsAfter).toContainEqual(format(blog));
    })
})

afterAll(() => {
    server.close()
})
