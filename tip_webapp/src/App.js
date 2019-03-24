import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import Search from "./components/Search"
import About from "./components/About"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to={'/search'} className="navbar-item">Search</Link>
                    <Link to={'/about'} className="navbar-item">About</Link>
                </div>
            </div>
        </nav>
        <hr/>
        <Switch>
              <Route path='/search' component={Search} />
              <Route path='/about' component={About} />
          </Switch>
      </Router>
    );
  }
}

export default App;
