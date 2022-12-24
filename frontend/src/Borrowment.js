import React, { Component } from 'react';
import firebaseApp from './firebase/Firebase';

class Borrowment extends Component {
	constructor(props) {
		super(props)
		this.deleteBorrowment = this.deleteBorrowment.bind(this)
	}
	deleteBorrowment(){
		var proceedDelete = confirm("Are really wanted to delete this data?");
		if(proceedDelete){
			firebaseApp.database().ref('categories/'+this.props.item.key).remove();
			alert('Data deleted successfully!')
		}
	}
  	render() {
		return <li key={this.props.item.key} className="list-group-item d-flex justify-content-between">
			<div className="wrapper d-flex flex-column align-items-start">
				<span className="fw-bold">{this.props.item.name} - {this.props.item.item}</span>
				<small className="text-muted mt-1">from {this.props.item.start} until {this.props.item.end}</small>
			</div>
			<div className="wrapper w-25 d-flex justify-content-around">
				<button className="btn btn-info btn-xs">Show</button>
				<button className="btn btn-warning btn-xs">Edit</button>
				<button className="btn btn-danger btn-xs" onClick={this.deleteBorrowment}>Delete</button>
			</div>
		</li>
  	}
}

export default Borrowment;
