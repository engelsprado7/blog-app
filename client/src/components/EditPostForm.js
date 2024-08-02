// components/PostForm.js
import React, { Component } from 'react';
import '../styles/forms.scss';

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
        const { onCancel } = this.props;

        return (
            <form className="form-container" onSubmit={this.handleSubmit}>
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
                <div>
                    <button type="submit">Update Post</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

export default PostForm;
