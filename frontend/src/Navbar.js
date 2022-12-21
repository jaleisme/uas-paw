import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import firebaseApp from './firebase/Firebase';

class Navbar extends Component {
  constructor(props) {
      super(props);
      //
      this.signout = this.signout.bind(this);
  }
  signout(){
    firebaseApp.auth().signOut().then(function() {
      console.log("sign out succesful");
      hashHistory.push('/login');
    }, function(error) {
      console.log("an error happened");
    });
  }
  render() {
    var loginButton;
    var signup;
    var navbar;
    if (this.props.loggedin) {
      loginButton = <a className="nav-link text-white" onClick={this.signout}>Logout</a>;
      signup = "";
    } else {
      loginButton = <Link className="nav-link text-white" to="/login">login</Link>;
      signup = <Link className="nav-link text-white" to="/signup">Sign up</Link>;
    }
    return (
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand fw-bold text-white" href="#">Inventory</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/categories" className="nav-link text-white">Categories</Link>
                </li>
              </ul>
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  {loginButton}
                </li>
                <li className="nav-item">
                  {signup}
                </li>
              </ul>
            </div>
          </div>
        </nav>      
      </div>
    );
  }
}

export default Navbar;
