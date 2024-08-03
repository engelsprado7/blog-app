import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">MyApp</Link>
            </div>
            <div className="navbar-links">
                {user.isAuthenticated ? (
                    <>
                        <Link to="/posts">Posts</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/logout">Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth,
});

export default connect(mapStateToProps)(Navbar);
