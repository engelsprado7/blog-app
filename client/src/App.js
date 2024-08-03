import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostForm from 'src/components/postForm';
import Register from 'src/components/register';
import Login from 'src/components/login';
import PostList from 'src/components/posts';
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
