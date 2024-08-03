import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/authActions'

const Navbar = ({ user, logoutUser, history }) => {
    const handleLogout = () => {
        logoutUser();
        history.push('/login'); // Redirect to login page after logout
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Blog App</Link>
            </div>
            <div className="navbar-links">
                {user.isAuthenticated ? (
                    <>
                        <button onClick={handleLogout} className="navbar-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-button">Login</Link>
                        <Link to="/register" className="navbar-button">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth,
});

const mapDispatchToProps = {
    logoutUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
