import React, { Component } from 'react';
import firebaseApp from './firebase/Firebase';

class Item extends Component {
	constructor(props) {
		super(props)
		this.deleteItem = this.deleteItem.bind(this)
	}
	deleteItem(){
		var proceedDelete = confirm("Are really wanted to delete this data?");
		if(proceedDelete){
			firebaseApp.database().ref('items/'+this.props.item.key).remove();
			alert('Data deleted successfully!')
		}
	}
  	render() {
		return <li key={this.props.item.key} className="list-group-item d-flex justify-content-between align-items-center">
			<div className="wrapper d-flex flex-column align-items-start">
				<span>
					<span className="fw-bold">{this.props.item.name} </span>
					<span className="badge bg-primary">{this.props.item.category}</span>
				</span>
				<small className="text-muted">{this.props.item.description}</small>
			</div>
			
			<div className="wrapper w-25 d-flex justify-content-around">
				<button className="btn btn-warning btn-xs" onClick={() => {this.props.handleEdit(this.props.item.key, this.props.item.name, this.props.item.description, this.props.item.category)}}>Edit</button>
				<button className="btn btn-danger btn-xs" onClick={this.deleteItem}>Delete</button>
			</div>
		</li>
  	}
}

export default Item;
