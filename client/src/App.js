import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

const App = () => (
  <Router>
    <div className="App">
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
