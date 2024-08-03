import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostList from './components/posts';
import PostForm from './components/postForm';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/navBar';
const App = () => (
  <Router>
    <div className="App">
      <NavBar />

      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" exact>
          <PostForm />
          <PostList />

        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
