import React, { Component } from 'react';
import BorrowmentList from './BorrowmentList';
import firebaseApp from './firebase/Firebase';

class Borrowments extends Component {
    constructor(props) {
    	super(props);
    	this.state = {name: "", start:"", end:"", note:"", item:"", items:[], borrowments: []};
    	//
    	this.handleNameChange = this.handleNameChange.bind(this)
    	this.handleStartChange = this.handleStartChange.bind(this)
    	this.handleEndChange = this.handleEndChange.bind(this)
    	this.handleNoteChange = this.handleNoteChange.bind(this)
    	this.handleItemChange = this.handleItemChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillMount(){
        var _this = this;
        var borrowments = firebaseApp.database().ref('borrowments');
        borrowments.on('value', function(snapshot) {
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
    handleStartChange(e) {
        this.setState({start: e.target.value});
    }
    handleEndChange(e) {
        this.setState({end: e.target.value});
    }
    handleNoteChange(e) {
        this.setState({note: e.target.value});
    }
    handleItemChange(e) {
        this.setState({item: e.target.value});
    }
    handleSubmit(e) {
        var _this = this;
	    e.preventDefault();
        console.log(_this.state);
        if(this.state.name !== '' || this.state.note !== '' || this.state.start !== '' || this.state.end !== '' || this.state.item !== ''){
            try {
                firebaseApp.database().ref('borrowments/').push({
                    name: _this.state.name,
                    start: _this.state.start,
                    end: _this.state.end,
                    note: _this.state.note,
                    item: _this.state.item,
                });
            } catch (error) {
                console.log(error);
                alert('Failed adding category, check the console')
            }
            alert('Borrowment added!')
            this.setState({name: "", start:"", end:"", note:"", item:""});
        } else {
            alert('Your data is empty! Fill the form first.')
        }
    }

  	render() {
        var options = this.state.items.map( (item) => {
            return <option value={item.name}>{item.name}</option>
        });
        if (options.length === 0){
            options = <option selected disabled>No Item Existed.</option>
        }
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
                                        <label htmlFor="name" className="form-label">Borrower Name</label>
                                    </div>
                                    <div className="form-floating my-3">
                                        <input type="date" id="start" className="form-control" value={this.state.start} onChange={this.handleStartChange} placeholder="Choose date" name="start" />
                                        <label htmlFor="start" className="form-label">Start Date</label>
                                    </div>
                                    <div className="form-floating my-3">
                                        <input type="date" id="start" className="form-control" value={this.state.end} onChange={this.handleEndChange} placeholder="Choose date" name="start" />
                                        <label htmlFor="start" className="form-label">End Date</label>
                                    </div>
                                    <div className="form-floating my-3">
                                        <input type="text" id="note" className="form-control" value={this.state.note} onChange={this.handleNoteChange} placeholder="Add Note(s)" name="note" />
                                        <label htmlFor="note" className="form-label">Note</label>
                                    </div>
                                    <div className="form-floating my-3">
                                        <select id="item" className="form-control" value={this.state.item} onChange={this.handleItemChange} placeholder="Select item" name="category">
                                            <option selected value={""}>Select item</option>
                                            {options}
                                        </select>
                                        <label htmlFor="category" className="form-label">Item</label>
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
