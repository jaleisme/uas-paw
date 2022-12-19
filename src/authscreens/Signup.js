import React, { Component } from 'react';
import { Link } from 'react-router';
import * as firebase from 'firebase';
import firebaseApp from '../firebase/Firebase';
import isEmail from 'validator/lib/isEmail';

class Signup extends Component {
	constructor(props) {
    	super(props);
    	this.state = {email: "", password:""};
    	//
    	this.handleEmailChange = this.handleEmailChange.bind(this)
    	this.handlePassChange = this.handlePassChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
   handlePassChange(e) {
    this.setState({password: e.target.value});
  }
	handleSubmit(e) {
	    e.preventDefault();
	    var email = this.state.email.trim();
	    var password = this.state.password.trim();
      if(isEmail(email)){
  	    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  		    // Handle Errors here.
  		    var errorMessage = error.message;
  		    alert("errorMessage: "+ errorMessage)
  		  });
      }else{
        alert("Email Address in not valid");
      }  
  }
  handleFacebook(e) {
    e.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      console.log('Facebook login success')
    }).catch(function(error) {
      var errorMessage = error.message;
      alert("Facebook sign in error: "+ errorMessage);
    });
  }
   handleGoogle(e) {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      console.log('Google login success')
    }).catch(function(error) {
      var errorMessage = error.message;
      alert("Google sign in error: "+ errorMessage);
    });
  }

  render() {
    return (
      <div className="Signup">
        <div className="row" style={{ height:"100vh" }}>
          <div className="col-12 col-md-8 text-center p-5 d-flex justify-content-center align-items-center">
            <div className="wrapper w-75">
              <h2 className="h2" style={{ fontWeight: "bolder" }}>Sign Up</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="form-floating my-3">
                  <input type="text" id="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" />
                  <label htmlFor="email" className="form-label">Email</label>
                </div>
                <div className="form-floating">
                  <input type="password" id="password" className="form-control" value={this.state.password} onChange={this.handlePassChange} placeholder="Enter Password" /><br/>
                  <label htmlFor="password" className="form-label">Password</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>              
            </div>
          </div>
          <div className="col-12 col-md-4 bg-primary text-white h-100 d-flex justify-content-center align-items-center">
            <div className="wrapper w-75">
              <h2 className="h2" style={{ fontWeight: "bolder" }}>Have an Account</h2>
              <p>If you already have an account and want to continue, <Link to="/login" className="text-white fw-bold text-decoration-none"> Click Here!</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
