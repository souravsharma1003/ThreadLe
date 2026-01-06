var express = require('express')
var router = express.Router()
const User = require('../models/User')
const { createToken } = require('../utils/JWT')
const authMiddleware = require('../middlewares/AuthMWare')

router.post('/signup', async function (req, res) {
  try {
    const { username, email, password } = req.body

    // Save user in DB
    const newUser = await User.create({ username, email, password })

    // Create JWT token
    const token = createToken({
      _id: newUser._id,
      username,
      email,
      isAdmin: newUser.isAdmin,
      createdAt: newUser.createdAt
    })

    // Set cookie first, then send JSON
    res
      .cookie('token', token, {
        httpOnly: true, // prevents JS access
        secure: true, // must be true for HTTPS
        sameSite: 'none', // allows cross-site cookies (needed if frontend is on different domain)
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      })
      .status(201)
      .json({
        success: true,
        message: 'User created successfully',
        user: {
          username,
          email,
          _id: newUser._id,
          isAdmin: newUser.isAdmin,
          createdAt: newUser.createdAt
        }
      })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body

    // Find user in DB
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // Check password
    const isMatch = password === user.password
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' })
    }

    // Create JWT token
    const token = createToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    })

    // Set cookie first, then send JSON
    res
      .cookie('token', token, {
        httpOnly: true, // prevents JS access
        secure: true, // must be true for HTTPS
        sameSite: 'none', // allows cross-site cookies (needed if frontend is on different domain)
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      })
      .status(200)
      .json({
        success: true,
        message: 'Login successful',
        user: {
          username: user.username,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt
        }
      })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

router.get('/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user })
})

module.exports = router
