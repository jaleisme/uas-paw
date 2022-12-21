import React, { Component } from 'react';
import firebaseApp from './firebase/Firebase';
import Notelist from './Notelist';

class Dashboard extends Component {
	constructor(props) {
		var user = firebaseApp.auth().currentUser;
    	super(props)
    	this.state = {user: user, text:"", notes:[], categories:[]}
    	this.handleSubmit = this.handleSubmit.bind(this)
    	this.handleTextChange = this.handleTextChange.bind(this)
  	}
  	componentWillMount(){
  		var _this = this;
  		var items = firebaseApp.database().ref('users/' + this.state.user.uid +"/notes");
		items.on('value', function(snapshot) {
		  var obj = snapshot.val();
		  //convert object to array
		  var arr =  [];
		  for(var key in obj) {
		  		if (key) {
				    var value = obj[key];
				    obj[key].key = key;
				    arr.push(value)
				}
			}
		  _this.setState({notes: arr });
		});
  	}
  	handleTextChange(e) {
	    this.setState({text: e.target.value});
	  }
  	handleSubmit(e) {
  		var _this = this;
	    e.preventDefault();
	    firebaseApp.database().ref('users/' + this.state.user.uid+"/notes").push({
		    note: _this.state.text,
		  });
	} 
  render() {
    return (
      <div className="Dashboard mt-5">
      	<h3 className="fw-bold">Welcome back, Admin!</h3>
      </div>
    );
  }
}

export default Dashboard;
