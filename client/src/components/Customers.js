import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions/customerActions'

class Customers extends Component {
  onDeleteCustomer = customerId => {
    return e => {
      e.preventDefault()

      if (window.confirm('Are you sure ?')) {
        this.props.dispatch(actions.deleteCustomer(customerId))
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(actions.getCustomers())
  }

  render() {
    const { pending, customers } = this.props

    return (
      <div>
        <div className="row">
          <div className="col-12 col-md-6">
            <h1>Customers</h1>
          </div>
          <div className="col-6 col-md-4">
            <Link to="/customers/new" className="btn btn-primary">
              Create new
            </Link>
          </div>
        </div>
        {pending ? (
          <div>Loading...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>
                    <Link
                      to={`/customers/${customer.id}`}
                      className="btn btn-link"
                    >
                      <i className="icon-pencil" />
                    </Link>
                    <button
                      style={{ cursor: 'pointer', color: 'red' }}
                      className="btn btn-link"
                      onClick={this.onDeleteCustomer(customer.id)}
                    >
                      <i className="icon-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

export default connect(state => {
  const { pending, customers } = state.customer
  return {
    pending,
    customers,
  }
})(Customers)
