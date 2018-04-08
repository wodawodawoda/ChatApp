import React, {Component} from 'react';

class Board extends Component {
  constructor() {
    super();
    this.state = ({
      customers: []
    });
  }
  componentDidMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }
  render() {
    console.log(this.state.customers)
    return (
      <div>
        <h2>Customers</h2>
        {this.state.customers.map(customer => 
          <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
        )}
      </div>
    );
  }
}

export default Board