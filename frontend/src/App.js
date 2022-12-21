import React, { Component } from 'react';
import firebaseApp from './firebase/Firebase';
import { hashHistory } from 'react-router'
import Navbar from './Navbar';
import './css/font-awesome.css'
import './css/bootstrap-social.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {loggedin: false};
  }
  componentWillMount(){
    let _this = this;
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        //if logged in...
        _this.setState({loggedin: true});
          hashHistory.push('/dashboard'); //after login, redirect to dashboard
      } else {
        //if not logged in...
        _this.setState({loggedin: false});
      }
    });
  } 
  render() {
    var navbar;
    if (this.state.loggedin !== false) {
      navbar = <Navbar loggedin={this.state.loggedin} />
    }
    else{
      navbar = ''
    }
    return (
      <div className="App" style={{ overflowX: "hidden" }}>
        {navbar}
        {this.props.children}
      </div>
    );
  }
}

export default App;
