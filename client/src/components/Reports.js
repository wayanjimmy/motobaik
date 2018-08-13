import React, { Component } from 'react'
import { connect } from 'react-redux'
import SelectInput from './SelectInput'
import Price from './Price'
import * as utils from '../utils'
import * as rentActions from '../actions/rentActions'
import * as reportActions from '../actions/reportActions'
import RentCalculator from '../RentCalculator'
import { PaddingBottom20 } from '../theme/globalStyle'
import CashReportGenerator from '../generators/CashReportGenerator'

class Reports extends Component {
  state = {
    filter: {
      year: '',
      month: '',
    },
    rents: this.props.rents,
  }

  onFilterChange = e => {
    let { filter } = this.state
    filter[e.target.name] = e.target.value
    this.setState({ filter })
    this.props.dispatch(
      rentActions.getRents(filter.year, filter.month, filter.customerId)
    )
  }

  onCompanyCashChange = rent => {
    return e => {
      let { rents } = this.state
      rents = rents.map(r => {
        if (r.id === rent.id) {
          const calc = new RentCalculator(r.started_at, r.finished_at, +r.price)
          let totalPrice = calc.totalPriceInDays()

          if (!r.daily) {
            totalPrice = calc.totalPriceInMonths()
          }

          let companyCash = parseFloat(e.target.value).toFixed(0)

          if (companyCash > totalPrice) {
            companyCash = totalPrice
          }

          const commission = totalPrice - companyCash

          return {
            ...r,
            company_cash: companyCash,
            commission,
          }
        }
        return r
      })
      this.setState({ rents })
    }
  }

  onSave = e => {
    e.preventDefault()

    const { rents } = this.state
    const companyCashes = rents.map(rent => {
      return {
        rent_id: rent.id,
        company_cash: rent.company_cash,
      }
    })
    this.props.dispatch(reportActions.updateCompanyCashes(companyCashes))
  }

  onPrint = e => {
    e.preventDefault()
    let { rents } = this.state
    const { month } = this.state.filter
    const pdf = new CashReportGenerator(rents, month, { padding: 10 })
    pdf.generate().then(() => pdf.save())
  }

  componentDidMount() {
    const { year, month } = this.state.filter
    this.props.dispatch(rentActions.getRents(year, month))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rents.length > this.props.rents.length) {
      this.setState({ rents: nextProps.rents })
    }
  }

  render() {
    const { pending, allYears, allMonths } = this.props
    const { rents } = this.state

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

    const grandTotalCompanyCash = rents.reduce((carrier, rent) => {
      return carrier + +rent.company_cash
    }, 0)

    const grandTotalCommission = rents.reduce((carrier, rent) => {
      const calc = new RentCalculator(
        rent.started_at,
        rent.finished_at,
        +rent.price
      )
      let price = calc.totalPriceInDays()
      if (!rent.daily) {
        price = calc.totalPriceInMonths()
      }
      const commission = price - +rent.company_cash
      return carrier + commission
    }, 0)

    return (
      <div>
        <div className="row">
          <div className="col-12 col-md-6">
            <h1>Reports</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <SelectInput
              name="year"
              label="Year"
              value={this.state.filter.year}
              defaultOption="- Select Year -"
              options={allYears}
              onChange={this.onFilterChange}
            />
          </div>
          <div className="col-6">
            <SelectInput
              name="month"
              label="Month"
              value={this.state.filter.month}
              defaultOption="- Select Month -"
              options={allMonths}
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
                <th>Total Price</th>
                <th>Company</th>
                <th>Commission</th>
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

                const commission = totalPrice - rent.company_cash

                return (
                  <tr key={rent.id}>
                    <td>
                      {rent.customer.name}{' '}
                      <small>({rent.daily ? 'daily' : 'monthly'})</small>
                    </td>
                    <td>{`${rent.vehicle.police_number} - ${rent.vehicle
                      .brand}`}</td>
                    <td>{startedAt}</td>
                    <td>{utils.currency(totalPrice)}</td>
                    <td>
                      <input
                        type="number"
                        value={rent.company_cash}
                        onChange={this.onCompanyCashChange(rent)}
                      />
                    </td>
                    <td>
                      <input type="number" value={commission} readOnly />
                    </td>
                  </tr>
                )
              })}
              <tr>
                <td colSpan={3}>Total</td>
                <td>
                  <Price value={grandTotalPrice} />
                </td>
                <td>
                  <Price value={grandTotalCompanyCash} />
                </td>
                <td>
                  <Price value={grandTotalCommission} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="row">
          <div className="col-12">
            <PaddingBottom20>
              <button
                className="btn btn-primary btn-block"
                onClick={this.onSave}
              >
                Save
              </button>
              <button
                className="btn btn-success btn-block"
                onClick={this.onPrint}
              >
                Print As PDF
              </button>
            </PaddingBottom20>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  const allYears = utils.allYears()
  const allMonths = utils.allMonths()
  let { pending, rents } = state.rent

  rents = rents.map(rent => {
    return {
      ...rent,
      company_cash: parseFloat(rent.company_cash).toFixed(0),
    }
  })

  return {
    allYears,
    allMonths,
    pending,
    rents,
  }
})(Reports)
