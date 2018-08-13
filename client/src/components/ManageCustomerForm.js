import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import CustomerForm from './CustomerForm'
import * as actions from '../actions/customerActions'

class ManageCustomerForm extends Component {
  state = {
    redirectToListPage: false,
    customer: Object.assign({}, this.props.customer),
  }

  onUpdateCustomerState = e => {
    const field = e.target.name
    let { customer } = this.state
    customer[field] = e.target.value
    this.setState({ customer })
  }

  onSaveCustomer = e => {
    e.preventDefault()
    const { customer } = this.state

    if (customer.id === '') {
      this.props.dispatch(actions.createCustomer(customer))
    } else {
      this.props.dispatch(actions.updateCustomer(customer))
    }
    this.setState({ redirectToListPage: true })
  }

  render() {
    const { customer, redirectToListPage } = this.state

    if (redirectToListPage) {
      return <Redirect to="/customers" />
    }

    return (
      <div>
        <h1>{customer.id === '' ? 'Create new' : 'Edit customer'}</h1>

        <div className="row">
          <div className="col-6">
            <CustomerForm
              customer={customer}
              onSave={this.onSaveCustomer}
              onChange={this.onUpdateCustomerState}
            />
          </div>
        </div>
      </div>
    )
  }
}

function getCustomerById(customers, id) {
  const customer = customers.filter(c => c.id === parseInt(id, 10))

  if (customer) {
    return customer[0]
  }

  return null
}

export default connect((state, ownProps) => {
  let customer = { id: '', name: '', phone: '', address: '' }

  const customerId = ownProps.match.params.id
  if (customerId && state.customer.customers.length > 0) {
    customer = getCustomerById(state.customer.customers, customerId)
  }

  return {
    customer,
  }
})(ManageCustomerForm)
