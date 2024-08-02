import React, { Component } from 'react';

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
        this.props.onAddPost(this.state);
        this.setState({ title: '', content: '' });
    };

    render() {
        const { title, content } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
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
                    placeholder="Content"
                    required
                />
                <button type="submit">Add Post</button>
            </form>
        );
    }
}

export default PostForm;
