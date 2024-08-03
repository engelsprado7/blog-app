import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostList from './components/Posts';
import PostForm from './components/postForm';
import Register from './components/register';
import Login from './components/login';
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
