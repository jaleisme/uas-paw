import React, { Component } from 'react';
import Category from './Category';

class CategoryList extends Component {
  render() {
    var list = this.props.items.map( (item) => {
      return <Category key={item.key} item={item} handleEdit={this.props.handleEdit} />
    });
    if (list.length === 0){
      list = <div className="card h-100">
        <div className="card-body p-3">
          <span className="text-muted">There's no data on the database :(</span>
        </div>
      </div>
    }
    return <ul className="list-group">
      {list}
    </ul>
  }
}

export default CategoryList;
