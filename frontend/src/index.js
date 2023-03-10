import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './App';
import Login from './authscreens/Login';
import Signup from './authscreens/Signup';
import Recover from './authscreens/Recover';
import Dashboard from './Dashboard';
import Categories from './Categories';
import Items from './Items';
import Borrowments from './Borrowments';
import requireAuth from './utils/RequireAuth';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="recover" component={Recover} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="categories" component={Categories} onEnter={requireAuth} />
      <Route path="items" component={Items} onEnter={requireAuth} />
      <Route path="borrowments" component={Borrowments} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'))