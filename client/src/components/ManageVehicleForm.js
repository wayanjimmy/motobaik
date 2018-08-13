import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import VehicleForm from './VehicleForm'
import * as actions from '../actions/vehicleActions'

class ManageVehicleForm extends Component {
  state = {
    redirectToListPage: false,
    vehicle: Object.assign({}, this.props.vehicle),
  }

  onUpdateVehicleState = e => {
    const field = e.target.name
    let { vehicle } = this.state
    vehicle[field] = e.target.value
    this.setState({ vehicle })
  }

  onSaveVehicle = e => {
    e.preventDefault()
    const { vehicle } = this.state

    if (vehicle.id === '') {
      this.props.dispatch(actions.createVehicle(vehicle))
    } else {
      this.props.dispatch(actions.updateVehicle(vehicle))
    }
    this.setState({ redirectToListPage: true })
  }

  render() {
    const { vehicle, redirectToListPage } = this.state
    const { allMachineCapacities } = this.props

    if (redirectToListPage) {
      return <Redirect to="/vehicles" />
    }

    return (
      <div>
        <h1>{vehicle.id === '' ? 'Create new' : 'Edit vehicle'}</h1>

        <div className="row">
          <div className="col-6">
            <VehicleForm
              allMachineCapacities={allMachineCapacities}
              vehicle={vehicle}
              onChange={this.onUpdateVehicleState}
              onSave={this.onSaveVehicle}
            />
          </div>
        </div>
      </div>
    )
  }
}

function getVehicleById(vehicles, id) {
  const vehicle = vehicles.filter(v => v.id === parseInt(id, 10))

  if (vehicle) {
    return vehicle[0]
  }

  return null
}

export default connect((state, ownProps) => {
  let vehicle = {
    id: '',
    police_number: '',
    brand: '',
    machine_number: '',
    frame_number: '',
    bpkb_number: '',
    machine_capacity: '',
    bought_at: '',
  }

  const vehicleId = ownProps.match.params.id
  if (vehicleId && state.vehicle.vehicles.length > 0) {
    vehicle = getVehicleById(state.vehicle.vehicles, vehicleId)
  }

  const allMachineCapacities = [
    { value: 100, text: '100 cc' },
    { value: 110, text: '110 cc' },
    { value: 250, text: '250 cc' },
  ]

  return {
    vehicle,
    allMachineCapacities,
  }
})(ManageVehicleForm)
