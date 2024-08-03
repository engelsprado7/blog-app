import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';

class Login extends Component {
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
        this.props.loginUser(this.state).catch((err) => {
            this.setState({ error: err.message });
        });
    };

    render() {
        const { username, password, error } = this.state;

        return (
            <div className="login-container">
                <h2>Login {process.env.URL_SERVER}</h2>
                {error && <p className="error-message">{error}</p>}
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
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    loginUser
};

export default connect(null, mapDispatchToProps)(Login);
