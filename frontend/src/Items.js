import React, { Component } from 'react';
import ItemList from './ItemList';
import firebaseApp from './firebase/Firebase';

class Items extends Component {
    constructor(props) {
    	super(props);

        // Date logic
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;

    	this.state = {name: "", description:"", category:"", currentDate:currentDate, selectedCategory:"", key:"", isEdit: false, cancelButton:"", formTitle:"Insert New Data", submissionMethod:this.handleSubmit, categories:[], items: []};
    	//
    	this.handleCategoryChange = this.handleCategoryChange.bind(this)
    	this.handleNameChange = this.handleNameChange.bind(this)
    	this.handleDescChange = this.handleDescChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancelEdit = this.handleCancelEdit.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
    }
    componentWillMount(){
        var _this = this;
        var categories = firebaseApp.database().ref('categories');
        categories.on('value', function(snapshot) {
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

        var items = firebaseApp.database().ref('items');
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
            _this.setState({items: arr });
        });
    }
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleDescChange(e) {
        this.setState({description: e.target.value});
    }
    handleCategoryChange(e) {
        console.log(this.state.category);
        this.setState({category: e.target.value});
    }
    handleSubmit(e) {
        var _this = this;
	    e.preventDefault();
        console.log(_this.state);
        if(this.state.name !== '' || this.state.description !== '' || this.state.category !== ''){
            try {
                firebaseApp.database().ref('items/').push({
                    name: _this.state.name,
                    description: _this.state.description,
                    category: _this.state.category,
                    last_modified: _this.state.currentDate,
                });
            } catch (error) {
                console.log(error);
                alert('Failed adding item, check the console')
            }
            alert('Item added!')
            this.setState({name: "", description:"", category:""});
        } else {
            alert('Your data is empty! Fill the form first.')
        }
    }
    handleEdit(key, name, description, category) {
        var _this = this
        console.log(key, name, description, category);

        _this.setState({
            key:key,
            oldName:name,
            name:name,
            description:description,
            selectedCategory:category,
            category:category,
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
            key:"",
            oldName:"",
            name:"",
            description:"",
            selectedCategory:"",
            category:"",
            isEdit:false,
            formTitle:"Insert New Data",
            submissionMethod:this.handleSubmit,
            cancelButton: ""
        })
    }
    handleEditSubmit(e) {
        e.preventDefault();
        var _this = this;
        var itemName = this.state.name
        if(this.state.name !== ''){
            try {
                var items = firebaseApp.database().ref('borrowments').orderByChild('item').equalTo(_this.state.oldName);
                items.on('value', function(snapshot) {
                    console.log(_this.state.name);
                    var obj = snapshot.val();
                    //convert object to array
                    for(var key in obj) {
                        if (key) {
                            obj[key].item = itemName;
                            firebaseApp.database().ref('borrowments/'+key).set({      
                                name:  obj[key].name,
                                start:  obj[key].start,
                                end:  obj[key].end,
                                note:  obj[key].note,
                                item:  obj[key].item,                       
                            });
                        }
                    }
                })
                firebaseApp.database().ref('items/'+_this.state.key).set({
                    name: _this.state.name,
                    description: _this.state.description,
                    category: _this.state.category,
                    last_modified: _this.state.currentDate,
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
            name: "",
            description: "",
            category: "",
            last_modified: "",            
            isEdit:false,
            formTitle:"Insert New Data",
            submissionMethod:this.handleSubmit,
            cancelButton: ""
        })
    }    
  	render() {
        var options = this.state.categories.map( (item) => {
            return <option value={item.name}>{item.name}</option>
        });
        if (options.length === 0){
            options = <option selected disabled>No Category Existed.</option>
        }
        return (
            <div className="Items">
                <br/>
                {/* <p>You’re signed is as: {this.state.user.displayName} | {this.state.user.email}</p> */}
                <div className="row px-3">
                    <h3 className="fw-bold mb-5">Items</h3>
                    <div className="col-sm-12 col-md-8">
                        <ItemList items={this.state.items} handleEdit={this.handleEdit} />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <h5 className="fw-bold">{this.formTitle}</h5>
                                <form onSubmit={this.state.submissionMethod} className="">
                                    <div className="form-floating my-3">
                                        <input type="text" id="name" className="form-control" value={this.state.name} onChange={this.handleNameChange} placeholder="Enter Item" name="name" />
                                        <label htmlFor="name" className="form-label">Item Name</label>
                                    </div>
                                    <div className="form-floating my-3">
                                        <input type="text" id="description" className="form-control" value={this.state.description} onChange={this.handleDescChange} placeholder="Enter Description" name="description" />
                                        <label htmlFor="description" className="form-label">Description</label>
                                    </div>
                                    <div className="form-floating my-3">
                                        <select id="category" className="form-control" value={this.state.category} onChange={this.handleCategoryChange} placeholder="Enter category" name="category">
                                            <option selected value={""}>Select option</option>
                                            {options}
                                        </select>
                                        <label htmlFor="category" className="form-label">Category</label>
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

export default Items;
