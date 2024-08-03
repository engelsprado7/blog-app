const request = require('supertest');
const { describe, it, before } = require('mocha');
const app = require('../server'); // Adjust the path as necessary

describe('API Tests', () => {
    let chai;
    let expect;
    let cookie;

    before(async () => {
        ({ expect } = await import('chai'));

        // Log in to obtain a session cookie
        const loginResponse = await request(app)
            .post('/api/login')
            .send({ username: 'prado', password: 'amores' });
        cookie = loginResponse.headers['set-cookie'].pop().split(';')[0];
    });

    it('should respond with status 200 for GET /api/posts', (done) => {
        request(app)
            .get('/api/posts')
            .set('Cookie', cookie) // Include the cookie in the request
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                done();
            });
    });


    it('should create a new post for POST /api/posts', (done) => {
        const newPost = {
            title: 'Test Post',
            content: 'This is a test post.'
        };

        request(app)
            .post('/api/posts')
            .send(newPost)
            .set('Cookie', cookie) // Include the cookie in the request
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('_id');
                expect(res.body.title).to.equal(newPost.title);
                expect(res.body.content).to.equal(newPost.content);
                done();
            });
    });

    it('should delete a post for DELETE /api/posts/:id', (done) => {
        // First create a post to delete
        const newPost = {
            title: 'Delete Post',
            content: 'This post will be deleted.'
        };

        request(app)
            .post('/api/posts')
            .send(newPost)
            .set('Cookie', cookie) // Include the cookie in the request
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const postId = res.body._id;

                // Then delete the post
                request(app)
                    .delete(`/api/posts/${postId}`)
                    .set('Cookie', cookie) // Include the cookie in the request
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body).to.have.property('message', 'Post deleted');
                        done();
                    });
            });
    });

    it('should update a post for PUT /api/posts/:id', (done) => {
        // First create a post to update
        const newPost = {
            title: 'Update Post',
            content: 'This post will be updated.'
        };

        request(app)
            .post('/api/posts')
            .send(newPost)
            .set('Cookie', cookie) // Include the cookie in the request
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const postId = res.body._id;
                const updatedPost = {
                    title: 'Updated Post Title',
                    content: 'This post has been updated.'
                };

                // Then update the post
                request(app)
                    .put(`/api/posts/${postId}`)
                    .send(updatedPost)
                    .set('Cookie', cookie) // Include the cookie in the request
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body.title).to.equal(updatedPost.title);
                        expect(res.body.content).to.equal(updatedPost.content);
                        done();
                    });
            });
    });
});

