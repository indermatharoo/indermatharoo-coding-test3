import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react';
import './Config';  // load global variables.
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ls from 'local-storage'

import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Detail from './components/Detail';

export default class App extends Component {
  
  render() {
    const isLoggedIn = ls.get('api_key');
    const firstName  = ls.get('first_name');
    // console.log(ls.get('first_name'));
      return(
        <Router>
          { !isLoggedIn &&
          <div>
          <Menu>
            <Menu.Item name='Login'>
              <Link to={'/'} className="nav-link"> Login {isLoggedIn}</Link>
            </Menu.Item>
            <Menu.Item name='Sign Up'>
              <Link to={'/signup'} className="nav-link">Sign Up</Link>
            </Menu.Item>      
          </Menu>
          <Switch>
            <Route exact path='/' component={() => <Login data={this}/>} />
            <Route exact path='/signup' component={Signup} /> 
          </Switch>
          </div>
          }
          { isLoggedIn &&
          <div>
          <Menu>
            <Menu.Item name='detail'>
              <Link to={'/'} className="nav-link">Welcome ({firstName})</Link>
            </Menu.Item>
            <Menu.Item name='Logout'>
              <Link to={'/logout'} className="nav-link"> Logout </Link>
            </Menu.Item>
          </Menu>
          <Switch>
            <Route exact path='/' component={Detail} /> 
            <Route exact path='/logout' component={() => <Logout data={this}/>} />
          </Switch>
          </div>  
          }
      </Router>
      )
  }

}
