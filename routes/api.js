const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = new User({ username, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        const token = newUser.generateJWT();
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = user.generateJWT();
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }
});
// Logout


// Logout route
router.get('/logout', (req, res) => {
    // Instruct the client to remove the JWT token
    res.status(200).json({ message: 'Logged out successfully' });
});


// Create Post
router.post('/posts', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id
        });
        const post = await newPost.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Read all Posts based on the authenticated user's ID
router.get('/posts', passport.authenticate('jwt', { session: false }), async (req, res) => {

    const { page = 1, limit = 3 } = req.query; // Default to page 1 and limit 10
    try {
        // Calculate totalPosts based on the same filter used in find
        const totalPosts = await Post.countDocuments({ author: req.user._id });

        // Fetch the posts with pagination
        const posts = await Post.find({ author: req.user._id })
            .populate('author')
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .exec();

        // Send the response
        res.status(200).json({
            posts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Read a single Post
router.get('/posts/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author').exec();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Post
router.put('/posts/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Post
router.delete('/posts/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
