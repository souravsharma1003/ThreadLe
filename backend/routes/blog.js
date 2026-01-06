var express = require('express');
const authMiddleware = require('../middlewares/AuthMWare');
var router = express.Router();
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');


router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json({ success: true, blogs, message: 'Blogs fetched successfully' });
  } catch (e) {
    res.json({success: false, message: 'Internal server error'})
  }
})
router.post('/create', authMiddleware, async function(req, res, next) {
  const { title, content } = req.body;
  console.log(req.user);
  try {
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Create blog post
    const newBlog = new Blog({
      title,
      content,
      author: req.user.username,
      authorId: req.user._id,
    });

    await newBlog.save();
    res.status(201).json({ success: true, message: 'Blog created successfully', blog: newBlog });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Approve Blog
router.patch('/:id/approve', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  if (!user || !user.isAdmin) return res.json({success: false, message: 'Unauthorized'});

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    blog.status = 'published';
    await blog.save();
    res.json({ success: true, message: 'Blog approved successfully', blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Reject Blog
router.patch('/:id/reject', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  if (!user || !user.isAdmin) return res.json({success: false, message: 'Unauthorized'});

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    blog.status = 'rejected';
    await blog.save();
    res.json({ success: true, message: 'Blog approved successfully', blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Delete Blog
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  if (!user) return res.json({ success: false, message: 'Unauthorized' });

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}); 

// Like or dislike Blog

router.post('/:id/like', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  if (!id || !user) return res.status(400).json({ success: false, message: 'Invalid request' });

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    // Check if user has already liked the blog
    if (blog.likes.includes(user._id)) {
      blog.likes = blog.likes.filter(id => id != user._id);
      await blog.save();
      return res.json({ success: true, message: 'Blog unliked successfully', likes: blog.likes });
    }

    blog.likes.push(user._id);
    await blog.save();
    res.json({ success: true, message: 'Blog liked successfully', likes: blog.likes });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate('comments');
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// add comment 
router.post('/:id/comments', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const { user } = req;
  try {
    if (!id || !content) {
      return res.status(400).json({ success: false, message: 'Invalid request' });
    }

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    const newComment = await Comment.create({
      author: user.username,
      authorId: user._id,
      content,
    });


    blog.comments.push(newComment?._id);
    await blog.save();


    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: newComment._id,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Fetch Blogs of a given userId

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) return res.status(400).json({ success: false, message: 'No userID' });
    const blogs = await Blog.find({ authorId: userId });
    res.json({ success: true, message: "Fetched Blogs successfully", blogs });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
})

module.exports = router;
