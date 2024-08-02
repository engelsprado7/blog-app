import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions/postsActions';
import EditPostForm from './EditPostForm';
import Modal from '../ui/Modal';

class PostList extends Component {
    state = {
        editingPost: null,
        isModalOpen: false
    };

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

    startEditing = (post) => {
        this.setState({ editingPost: post, isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ editingPost: null, isModalOpen: false });
    };

    render() {
        const { user, posts, loading, error } = this.props;
        const { editingPost, isModalOpen } = this.state;

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
            <div className="post-list">
                <h2>Post List</h2>
                <Modal isOpen={isModalOpen} onClose={this.closeModal}>
                    {editingPost && (
                        <EditPostForm
                            post={editingPost}
                            onCancel={this.closeModal}
                        />
                    )}
                </Modal>
                <ul className="post-list__items">
                    {posts && posts.map((post) => (
                        <li key={post._id} className="post-list__item">
                            <h3 className="post-list__title">{post.title}</h3>
                            <p className="post-list__content">{post.content}</p>
                            <div className="post-list__actions">
                                <button className="post-list__button post-list__button--edit" onClick={() => this.startEditing(post)}>Edit</button>
                                <button className="post-list__button post-list__button--delete" onClick={() => this.handleDelete(post._id)}>Delete</button>
                            </div>
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
