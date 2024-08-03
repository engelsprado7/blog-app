import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostForm from 'components/postForm';
import Register from 'components/register';
import Login from 'components/login';
import PostList from 'components/posts';
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
