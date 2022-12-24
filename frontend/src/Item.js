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
		return <li key={this.props.item.key} className="list-group-item d-flex justify-content-between">
			{this.props.item.name}
			<div className="wrapper w-25 d-flex justify-content-around">
				<button className="btn btn-info btn-xs">Show</button>
				<button className="btn btn-warning btn-xs">Edit</button>
				<button className="btn btn-danger btn-xs" onClick={this.deleteItem}>Delete</button>
			</div>
		</li>
  	}
}

export default Item;
