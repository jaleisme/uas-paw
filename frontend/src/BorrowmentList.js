import React, { Component } from 'react';
import Borrowment from './Borrowment';

class BorrowmentList extends Component {
  render() {
    var list = this.props.items.map( (item) => {
      return <Borrowment key={item.key} item={item} />
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

export default BorrowmentList;
