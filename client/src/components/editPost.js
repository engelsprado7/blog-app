import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../actions/postsActions';

class EditPostForm extends Component {
    state = {
        title: this.props.post.title,
        content: this.props.post.content
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { title, content } = this.state;
        const { post, editPost, onCancel } = this.props;
        editPost(post._id, { title, content });
        onCancel();
    };

    render() {
        const { title, content } = this.state;
        const { onCancel } = this.props;

        return (
            <form className="edit-post-form" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    placeholder="Title"
                    required
                    className="edit-post-form__input"
                />
                <textarea
                    name="content"
                    value={content}
                    onChange={this.handleChange}
                    placeholder="Content"
                    required
                    className="edit-post-form__textarea"
                />
                <div className="edit-post-form__buttons">
                    <button type="submit" className="edit-post-form__button edit-post-form__button--submit">Update Post</button>
                    <button type="button" className="edit-post-form__button edit-post-form__button--cancel" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = {
    editPost
};

export default connect(null, mapDispatchToProps)(EditPostForm);
