import React, { Component } from 'react';
import firebaseApp from './firebase/Firebase';

class Category extends Component {
	constructor(props) {
		super(props)
		this.deleteCategory = this.deleteCategory.bind(this)
	}
	deleteCategory(){
		var proceedDelete = confirm("Are really wanted to delete this data?");
		if(proceedDelete){
			firebaseApp.database().ref('categories/'+this.props.item.key).remove();
			alert('Data deleted successfully!')
		}
	}
  	render() {
		return <li key={this.props.item.key} className="list-group-item d-flex justify-content-between">{this.props.item.name} <button className="btn btn-danger btn-xs" onClick={this.deleteCategory}>Delete</button></li>
  	}
}

export default Category;
