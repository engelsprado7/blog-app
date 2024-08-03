const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const passport = require('passport');

// Register
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        passport.authenticate('local')(req, res, () => {
            res.status(200).json({ message: 'Registration successful', user });
        });
    });
});


// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("LOGIN")
    res.status(200).json(req.user);
});

// Logout


router.get('/logout', (req, res) => {
    console.log("LOGOUT")
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', error: err });
        }
        // Successfully logged out
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error destroying session', error: err });
            }
            res.status(200).json({ message: 'Logged out successfully' });
        });
    });
});

// Middleware to ensure user is authenticated
const isAuthenticated = (req, res, next) => {
    console.log("REQ", req.user)
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'You must be logged in to perform this action' });
};

// Create Post
router.post('/posts', isAuthenticated, async (req, res) => {
    console.log("POST")
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
router.get('/posts', isAuthenticated, async (req, res) => {

    const { page = 1, limit = 3 } = req.query; // Default to page 1 and limit 10
    console.log("query", req.query)
    try {
        // Calculate totalPosts based on the same filter used in find
        const totalPosts = await Post.countDocuments({ author: req.user._id });
        console.log("TOTAL POST", totalPosts);

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
router.get('/posts/:id', isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author').exec();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Post
router.put('/posts/:id', isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Post
router.delete('/posts/:id', isAuthenticated, async (req, res) => {
    console.log("REQ", req.params);
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
