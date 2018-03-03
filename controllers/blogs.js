const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  try {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET)
    const { title, author, url, likes=0 } = request.body;
    
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'missing or invalid token'})
    }

    if (!title && !url) {
      return response.sendStatus(400);
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (err) {
    if (err.name === 'JsonWebTokenError' ) {
      return response.status(401).json({ error: err.message })
    }
    console.log(err)
    response.status(500).json({error: 'mitä menit tekemään?'})
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);
  try {
    const blog = await Blog
      .findById(id)
      .populate('user', {id: 1})
    const decodedToken = await jwt.verify(req.token, process.env.SECRET)
    console.log(decodedToken)
    console.log(blog)
    if (!blog.user || blog.user && blog.user._id == decodedToken.id) {
      await Blog.remove({_id: id})
      return res.sendStatus(204);
    }
    res.status(401).send({error: 'Ei oikeuksia'})
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