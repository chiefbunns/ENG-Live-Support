// App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Create from './components/Create';
import Index from './components/Index';
import Login from './components/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import withAuth from './components/withAuth';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand">Live Support</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link to={'/create'} className="nav-link">Create</Link></li>
                <li className="nav-item"><Link to={'/index'} className="nav-link">List</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                 <li className="nav-item"><Link to={'/login'} className="nav-link">Login</Link></li>
              </ul>
              <hr />
            </div>
          </nav> <br />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/create' component={withAuth(Create)} />
            <Route path='/index' component={withAuth(Index)} />
          </Switch>
        </div>
      </Router>);
  }
}

export default App;