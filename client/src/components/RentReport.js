import React, { Component } from 'react'
import { connect } from 'react-redux'
import { currency } from '../utils'
import RentReportGenerator from '../generators/RentReportGenerator'

class RentReport extends Component {
  onPrint = e => {
    e.preventDefault()

    const { rent } = this.props
    const pdf = new RentReportGenerator(rent, { padding: 10 })
    pdf.generate().then(() => pdf.save())
  }
  render() {
    const { rent } = this.props
    const startedAt = new Date(rent.started_at).toDateString()
    const finishedAt = new Date(rent.finished_at).toDateString()

    return (
      <div>
        <div className="row">
          <div className="col-12">
            <h2>Motobaik</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table>
              <tbody>
                <tr>
                  <td>Customer</td>
                  <td>{rent.customer.name}</td>
                </tr>
                <tr>
                  <td>Vehicle</td>
                  <td>{`${rent.vehicle.police_number} - ${rent.vehicle
                    .brand}`}</td>
                </tr>
                <tr>
                  <td>Started At</td>
                  <td>{startedAt}</td>
                </tr>
                <tr>
                  <td>Finished At</td>
                  <td>{finishedAt}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{currency(rent.price)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button className="btn btn-primary" onClick={this.onPrint}>
              Print
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function getRentById(rents, id) {
  const rent = rents.filter(r => r.id === parseInt(id, 10))

  if (rent) {
    return rent[0]
  }

  return null
}

export default connect((state, ownProps) => {
  const rentId = ownProps.match.params.id
  let rent = {}
  if (state.rent.rents.length > 0) {
    rent = getRentById(state.rent.rents, rentId)
  }
  return {
    rent,
  }
})(RentReport)
