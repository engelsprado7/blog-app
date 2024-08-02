// components/PostForm.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions/postsActions';

class PostForm extends Component {
    state = {
        title: '',
        content: ''
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addPost(this.state);
        this.setState({ title: '', content: '' });
    };

    render() {
        const { title, content } = this.state;

        return (
            <form className="post-form-container" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="content"
                    value={content}
                    onChange={this.handleChange}
                    placeholder="What's happening?"
                    required
                />
                <button type="submit">Post</button>
            </form>
        );
    }
}

const mapDispatchToProps = {
    addPost
};

export default connect(null, mapDispatchToProps)(PostForm);
