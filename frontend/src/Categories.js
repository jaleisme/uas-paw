import React, { Component } from 'react';
// import axios from "axios";
import CategoryList from './CategoryList';
import firebaseApp from './firebase/Firebase';

class Categories extends Component {
    constructor(props) {
    	super(props);
    	this.state = {res:"", oldName:"", name: "", key:"", isEdit: false, cancelButton:"", formTitle:"Insert New Data", submissionMethod:this.handleSubmit, categories: []};
    	//
    	this.handleNameChange = this.handleNameChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancelEdit = this.handleCancelEdit.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
    }

    async componentWillMount(){
        var temporaryThis = this;
        fetch('http://localhost:5001/categories', {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json'}
          })
        .then(response => response.json())
        .then(responseJson => {
            var arr =  [];
            for (const [key, value] of Object.entries(responseJson)) {
                var temp = {};
                temp.value = value
                temp.key = key
                arr.push(temp)
            }
            temporaryThis.setState({categories: arr });
        })
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleEdit(name, key) {
        var _this = this
        console.log(key, name);

        _this.setState({
            oldName:name,
            name:name,
            key:key,
            isEdit:true,
            formTitle:"Edit Data",
            submissionMethod:this.handleEditSubmit,
            cancelButton: <button type="button" onClick={this.handleCancelEdit} className="btn w-100 btn-danger me-2">Cancel</button>
        });
        console.log(this.state);
    }
    handleCancelEdit() {
        var _this = this

        _this.setState({
            oldName:"",
            name:"",
            key:"",
            isEdit:false,
            formTitle:"Insert New Data",
            submissionMethod:this.handleSubmit,
            cancelButton: ""
        })
    }
    async handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:5001/categories/new', {
            crossDomain:true,
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: this.state.name
            })
        }).then(msg => {
            alert(msg)
            this.setState({name: ""});
        })
    }
    handleEditSubmit(e) {
        e.preventDefault();
        var _this = this;
        if(this.state.name !== ''){
            try {
                var items = firebaseApp.database().ref('items').orderByChild('category').equalTo(_this.state.oldName);
                items.on('value', function(snapshot) {
                    console.log(_this.state.name);
                    var obj = snapshot.val();
                    console.log(obj);
                    //convert object to array
                    for(var key in obj) {
                        if (key) {
                            console.log();
                            obj[key].category = _this.state.name;
                            try {
                                firebaseApp.database().ref('items/'+key).set({
                                    name: obj[key].name,
                                    description: obj[key].description,
                                    category: obj[key].category,
                                    last_modified: obj[key].last_modified,                                
                                });
                            } catch (error) {
                                console.log(error);
                                alert('Failed adding category, check the console')
                            }
                        }
                    }
                })
                firebaseApp.database().ref('categories/'+_this.state.key).set({
                    name: _this.state.name,
                });

            } catch (error) {
                console.log(error);
                alert('Failed adding category, check the console')
            }
            alert('Category updated!')
        } else {
            alert('Your data is empty! Fill the form first.')
        }
        this.setState({
            isEdit:false,
            formTitle:"Insert New Data",
            submissionMethod:this.handleSubmit,
            cancelButton: ""
        })
        // this.handleCancelEdit()
    }

  	render() {
        return (
            <div className="Categories">
                <br/>
                {/* <p>You’re signed is as: {this.state.user.displayName} | {this.state.user.email}</p> */}
                <div className="row px-3">
                    <h3 className="fw-bold mb-5">Categories</h3>
                    <div className="col-sm-12 col-md-8">
                        <CategoryList items={this.state.categories} handleEdit={this.handleEdit} />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <h5 className="fw-bold">{this.state.formTitle}</h5>
                                <form onSubmit={this.state.submissionMethod} className="">
                                    <div className="form-floating my-3">
                                        <input type="text" id="name" className="form-control" value={this.state.name} onChange={this.handleNameChange} placeholder="Enter Category" name="name" />
                                        <label htmlFor="name" className="form-label">Category Name</label>
                                    </div>
                                    <div className="d-flex">
                                        {this.state.cancelButton}
                                        <button type="submit" className="btn w-100 btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          );
  	}
}

export default Categories;
