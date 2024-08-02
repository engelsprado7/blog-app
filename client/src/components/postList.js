import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions/postsActions';
class PostList extends Component {
    componentDidMount() {
        const { user, fetchPosts } = this.props;
        if (user.isAuthenticated) {
            fetchPosts();
        }
    }

    componentDidUpdate(prevProps) {
        const { user, fetchPosts } = this.props;
        if (user.isAuthenticated !== prevProps.user.isAuthenticated) {
            fetchPosts();
        }
    }

    handleDelete = (id) => {
        const { deletePost } = this.props;
        if (window.confirm('Are you sure you want to delete this post?')) {
            deletePost(id);
        }
    };

    render() {
        const { user, posts, loading, error } = this.props;

        if (!user.isAuthenticated) {
            return <p>Please log in to view posts.</p>;
        }

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p style={{ color: 'red' }}>{error}</p>;
        }

        return (
            <div>
                <h2>Post List</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post._id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <button onClick={() => this.handleDelete(post._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth,
    posts: state.posts.posts,
    loading: state.posts.loading,
    error: state.posts.error
});

const mapDispatchToProps = {
    fetchPosts,
    deletePost
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);