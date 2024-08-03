import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PostList from './components/posts';
import PostForm from './components/postForm';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/navBar';

const App = ({ isAuthenticated }) => (
  <Router>
    <div className="App">
      <NavBar />

      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" exact>
          {isAuthenticated ? (
            <>
              <PostForm />
              <PostList />
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  </Router>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
