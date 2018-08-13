import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Dock from 'react-dock'
import RentForm from './RentForm'
import CustomerForm from './CustomerForm'
import * as actions from '../actions/rentActions'
import * as customerActions from '../actions/customerActions'
import * as vehicleActions from '../actions/vehicleActions'
import { DockPadding, DockCloseIcon } from '../theme/globalStyle'

class ManageRentForm extends Component {
  state = {
    dockVisible: false,
    redirectToListPage: false,
    rent: Object.assign({}, this.props.rent),
    customer: Object.assign({}, this.props.customer),
  }

  onSaveRent = e => {
    e.preventDefault()

    const { rent } = this.state
    if (rent.id === '') {
      this.props.dispatch(actions.createRent(rent))
    } else {
      this.props.dispatch(actions.updateRent(rent))
    }
    this.setState({ redirectToListPage: true })
  }

  onUpdateRentState = e => {
    const field = e.target.name
    let { rent } = this.state
    rent[field] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    this.setState({ rent })
  }

  onStoreCustomer = e => {
    e.preventDefault()

    const { customer } = this.state
    this.props.dispatch(customerActions.createCustomer(customer))
    this.setState({
      dockVisible: false,
    })
  }

  onUpdateCustomerState = e => {
    const field = e.target.name
    let { customer } = this.state
    customer[field] = e.target.value
    this.setState({ customer })
  }

  onToggleDock = e => {
    e.preventDefault()

    this.setState({
      dockVisible: !this.state.dockVisible,
    })
  }

  onCreateCustomer = e => {
    e.preventDefault()
  }

  componentDidMount() {
    this.props.dispatch(customerActions.getCustomers())
    this.props.dispatch(vehicleActions.getVehicles())
  }

  render() {
    const { rent, customer, dockVisible, redirectToListPage } = this.state
    const { allCustomers, allVehicles } = this.props

    if (redirectToListPage) {
      return <Redirect to="/rents" />
    }

    return (
      <div>
        <Dock position="right" isVisible={dockVisible}>
          <DockPadding>
            <DockCloseIcon onClick={this.onToggleDock}>X</DockCloseIcon>
            <CustomerForm
              customer={customer}
              onSave={this.onStoreCustomer}
              onChange={this.onUpdateCustomerState}
            />
          </DockPadding>
        </Dock>
        <h1>{rent.id === '' ? 'Create new' : 'Edit rent'}</h1>
        <div className="row">
          <div className="col-12">
            <button className="btn btn-primary" onClick={this.onToggleDock}>
              New customer ?
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <RentForm
              rent={rent}
              allCustomers={allCustomers}
              allVehicles={allVehicles}
              onSave={this.onSaveRent}
              onChange={this.onUpdateRentState}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  let rent = {
    id: '',
    customer_id: '',
    vehicle_id: '',
    started_at: '',
    time_started_at: '10:00',
    finished_at: '',
    time_finished_at: '10:00',
    price: '',
    daily: true,
  }
  let customer = { id: '', name: '', phone: '', address: '' }
  const allCustomers = state.customer.customers.map(customer => {
    return {
      value: customer.id,
      text: customer.name,
    }
  })
  const allVehicles = state.vehicle.vehicles.map(vehicle => {
    return {
      value: vehicle.id,
      text: `${vehicle.police_number} - ${vehicle.brand}`,
    }
  })
  return {
    rent,
    customer,
    allCustomers,
    allVehicles,
  }
})(ManageRentForm)
