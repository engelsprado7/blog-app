const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const passport = require('passport');

// Register
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        passport.authenticate('local')(req, res, () => {
            res.status(200).json(user);
        });
    });
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json(req.user);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logged out' });
});

// CRUD for posts
// Create Post
router.post('/posts', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id
    });
    newPost.save((err, post) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(post);
    });
});

// Read all Posts
router.get('/posts', (req, res) => {
    Post.find().populate('author').exec((err, posts) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(posts);
    });
});

// Read a single Post
router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).populate('author').exec((err, post) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(post);
    });
});

// Update Post
router.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, post) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(post);
    });
});

// Delete Post
router.delete('/posts/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Post deleted' });
    });
});

module.exports = router;
