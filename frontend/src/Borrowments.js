import React, { Component } from 'react';
import BorrowmentList from './BorrowmentList';
import firebaseApp from './firebase/Firebase';

class Borrowments extends Component {
    constructor(props) {
    	super(props);
    	this.state = {name: "", borrowments: []};
    	//
    	this.handleNameChange = this.handleNameChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillMount(){
        var _this = this;
        var items = firebaseApp.database().ref('borrowments');
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
            _this.setState({borrowments: arr });
        });
    }
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleSubmit(e) {
        var _this = this;
	    e.preventDefault();
        console.log(_this.state);
        // if(this.state.name !== ''){
        //     try {
        //         firebaseApp.database().ref('categories/').push({
        //             name: _this.state.name,
        //         });
        //     } catch (error) {
        //         console.log(error);
        //         alert('Failed adding category, check the console')
        //     }
        //     alert('Category added!')
        //     this.setState({name: ""});
        // } else {
        //     alert('Your data is empty! Fill the form first.')
        // }
    }

  	render() {
        return (
            <div className="Categories">
                <br/>
                {/* <p>You’re signed is as: {this.state.user.displayName} | {this.state.user.email}</p> */}
                <div className="row px-3">
                    <h3 className="fw-bold mb-5">Borrowments</h3>
                    <div className="col-sm-12 col-md-8">
                        <BorrowmentList items={this.state.borrowments} />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <h5 className="fw-bold">Insert New Borrowment</h5>
                                <form onSubmit={this.handleSubmit} className="">
                                    <div className="form-floating my-3">
                                        <input type="text" id="name" className="form-control" value={this.state.name} onChange={this.handleNameChange} placeholder="Enter Borrowment" name="name" />
                                        <label htmlFor="name" className="form-label">Borrowment Name</label>
                                    </div>
                                    <button type="submit" className="btn w-100 btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          );
  	}
}

export default Borrowments;
