const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes=0 } = request.body;
    if (!title && !url) {
      return response.sendStatus(400);
    }
    const blog = new Blog({
      title,
      author,
      url,
      likes
    })
  
    const res = await blog.save()
    response.status(201).json(res)
  })

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.remove({_id: id});
    res.sendStatus(204);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
})

module.exports = blogsRouter;