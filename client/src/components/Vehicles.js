import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions/vehicleActions'

class Vehicles extends Component {
  onDeleteVehicle = vehicleId => {
    return e => {
      e.preventDefault()

      if (window.confirm('Are you sure?')) {
        this.props.dispatch(actions.deleteVehicle(vehicleId))
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(actions.getVehicles())
  }

  render() {
    const { pending, vehicles } = this.props

    return (
      <div>
        <div className="row">
          <div className="col-12 col-md-6">
            <h1>Vehicles</h1>
          </div>
          <div className="col-6 col-md-4">
            <Link to="/vehicles/new" className="btn btn-primary">
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
                <th>Police Number</th>
                <th>Type</th>
                <th>BPKB</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle.id}>
                  <td>{vehicle.police_number}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.bpkb_number}</td>
                  <td>
                    <Link
                      to={`/vehicles/${vehicle.id}`}
                      className="btn btn-link"
                    >
                      <i className="icon-pencil" />
                    </Link>
                    <button
                      style={{ cursor: 'pointer', color: 'red' }}
                      className="btn btn-link"
                      onClick={this.onDeleteVehicle(vehicle.id)}
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
  const { pending, vehicles } = state.vehicle

  return {
    pending,
    vehicles,
  }
})(Vehicles)
