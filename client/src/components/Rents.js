import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions/rentActions'
import * as customerActions from '../actions/customerActions'
import SelectInput from './SelectInput'
import * as utils from '../utils'
import RentReportGenerator from '../generators/RentReportGenerator'
import RentsReportGenerator from '../generators/RentsReportGenerator'
import RentCalculator from '../RentCalculator'

class Rents extends Component {
  state = {
    filter: {
      customerId: '',
      year: '',
      month: '',
    },
  }

  componentDidMount() {
    this.props.dispatch(actions.getRents())
    this.props.dispatch(customerActions.getCustomers())
  }

  onFilterChange = e => {
    let { filter } = this.state
    filter[e.target.name] = e.target.value
    this.setState({ filter })
    this.props.dispatch(
      actions.getRents(filter.year, filter.month, filter.customerId)
    )
  }

  onRentsPrint = rents => {
    return e => {
      e.preventDefault()
      const { allRawCustomers } = this.props
      const { month, customerId } = this.state.filter
      const customer = allRawCustomers.filter(
        customer => customer.id === +customerId
      )[0]
      const pdf = new RentsReportGenerator(customer, rents, month, {
        padding: 10,
      })
      pdf.generate().then(() => pdf.save())
    }
  }

  onRentPrint = rent => {
    return e => {
      e.preventDefault()
      const pdf = new RentReportGenerator(rent, { padding: 10 })
      pdf.generate().then(() => pdf.save())
    }
  }

  render() {
    const { year, month } = this.state.filter
    const disableRentsPrintButton = month === '' || year === ''

    const { pending, rents, allYears, allMonths, allCustomers } = this.props
    const grandTotalPrice = rents.reduce((carrier, rent) => {
      const calc = new RentCalculator(
        rent.started_at,
        rent.finished_at,
        +rent.price
      )
      let price = calc.totalPriceInDays()
      if (!rent.daily) {
        price = calc.totalPriceInMonths()
      }
      return carrier + price
    }, 0)

    return (
      <div>
        <div className="row">
          <div className="col-12 col-md-6">
            <h1>Rents</h1>
          </div>
          <div className="col-6 col-md-4">
            <Link to="/rents/new" className="btn btn-primary">
              Create new
            </Link>{' '}
            <button
              className="btn btn-success"
              disabled={disableRentsPrintButton}
              onClick={this.onRentsPrint(rents)}
            >
              <i className="icon-printer" /> Save as PDF
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <SelectInput
              name="year"
              label="Year"
              value={this.state.filter.year}
              defaultOption="- Select Year -"
              options={allYears}
              onChange={this.onFilterChange}
            />
          </div>
          <div className="col-4">
            <SelectInput
              name="month"
              label="Month"
              value={this.state.filter.month}
              defaultOption="- Select Month -"
              options={allMonths}
              onChange={this.onFilterChange}
            />
          </div>
          <div className="col-4">
            <SelectInput
              name="customerId"
              label="Customer"
              value={this.state.filter.customerId}
              defaultOption="- Select Customer -"
              options={allCustomers}
              onChange={this.onFilterChange}
            />
          </div>
        </div>
        {pending ? (
          <div>Loading...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Rent At</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rents.map(rent => {
                const startedAt = new Date(rent.started_at).toDateString()
                const calc = new RentCalculator(
                  rent.started_at,
                  rent.finished_at,
                  +rent.price
                )
                let totalPrice = calc.totalPriceInDays()

                if (!rent.daily) {
                  totalPrice = calc.totalPriceInMonths()
                }

                return (
                  <tr key={rent.id}>
                    <td>
                      {rent.customer.name}{' '}
                      <small>({rent.daily ? 'daily' : 'monthly'})</small>
                    </td>
                    <td>{`${rent.vehicle.police_number} - ${rent.vehicle
                      .brand}`}</td>
                    <td>{startedAt}</td>
                    <td>{utils.currency(rent.price)}</td>
                    <td>{utils.currency(totalPrice)}</td>
                    <td>
                      <button
                        className="btn btn-link"
                        onClick={this.onRentPrint(rent)}
                      >
                        <i className="icon-printer" />
                      </button>
                    </td>
                  </tr>
                )
              })}
              <tr>
                <td colSpan={4}>Total</td>
                <td colSpan={2}>{utils.currency(grandTotalPrice)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

export default connect(state => {
  const { pending, rents } = state.rent
  const { customers } = state.customer
  const allYears = utils.allYears()
  const allMonths = utils.allMonths()
  const allRawCustomers = customers
  const allCustomers = customers.map(customer => {
    return {
      value: customer.id,
      text: customer.name,
    }
  })

  return {
    pending,
    rents,
    allYears,
    allMonths,
    allCustomers,
    allRawCustomers,
  }
})(Rents)
