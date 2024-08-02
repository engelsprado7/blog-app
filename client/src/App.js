import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, addPost, deletePost } from './actions/postsActions';
import PostList from './PostList';
import PostForm from './PostForm';

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  handleAddPost = (post) => {
    this.props.addPost(post);
  };

  handleDeletePost = (id) => {
    this.props.deletePost(id);
  };

  render() {
    const { posts, loading, error } = this.props;

    return (
      <div className="App">
        <h1>Blog Posts</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <PostForm onAddPost={this.handleAddPost} />
        <PostList posts={posts} onDeletePost={this.handleDeletePost} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error,
});

const mapDispatchToProps = {
  fetchPosts,
  addPost,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
