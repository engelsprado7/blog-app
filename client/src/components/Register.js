import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';

class Register extends Component {
    state = {
        username: '',
        password: '',
        error: ''
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.registerUser(this.state).catch((err) => {
            this.setState({ error: err.message });
        });
    };

    render() {
        const { username, password, error } = this.state;

        return (
            <div>
                <h2>Register</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    registerUser
};

export default connect(null, mapDispatchToProps)(Register);
