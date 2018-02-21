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
  const { id } = req.params;
  if (!id) return res.sendStatus(400);
  try {
    await Blog.remove({_id: id});
    res.sendStatus(204);
  } catch (err) {
    console.log(err)
    res.sendStatus(400);
  }
})

blogsRouter.put('/:id', async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.log(err)
    res.sendStatus(404);
  }
})

module.exports = blogsRouter;