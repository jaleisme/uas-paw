import React, { Component } from 'react';
import CategoryList from './CategoryList';
import firebaseApp from './firebase/Firebase';

class Categories extends Component {
    constructor(props) {
    	super(props);
    	this.state = {oldName:"", name: "", key:"", isEdit: false, cancelButton:"", formTitle:"Insert New Data", submissionMethod:this.handleSubmit, categories: []};
    	//
    	this.handleNameChange = this.handleNameChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancelEdit = this.handleCancelEdit.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
    }
    componentWillMount(){
        var _this = this;
        var items = firebaseApp.database().ref('categories');
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
            _this.setState({categories: arr });
        });
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
    handleSubmit(e) {
        var _this = this;
	    e.preventDefault();
        if(this.state.name !== ''){
            try {
                firebaseApp.database().ref('categories/').push({
                    name: _this.state.name,
                });
            } catch (error) {
                console.log(error);
                alert('Failed adding category, check the console')
            }
            alert('Category added!')
            this.setState({name: ""});
        } else {
            alert('Your data is empty! Fill the form first.')
        }
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
                    //convert object to array
                    for(var key in obj) {
                        if (key) {
                            obj[key].category = _this.state.name;
                            firebaseApp.database().ref('items/'+key).set({
                                name: obj[key].category.name,
                                description: obj[key].category.description,
                                category: obj[key].category,
                                last_modified: obj[key].category.currentDate,                                
                            });
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
        this.handleCancelEdit()
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
                                <h5 className="fw-bold">Insert New Category</h5>
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
