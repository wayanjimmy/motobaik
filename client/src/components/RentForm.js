import React from 'react'
import PropTypes from 'prop-types'
import SelectInput from './SelectInput'
import DateInput from './DateInput'
import NumberInput from './NumberInput'
import CheckBoxInput from './CheckBoxInput'
import TimePickerInput from './TimePickerInput'
import RentCalculator from '../RentCalculator'

const RentForm = ({
  rent,
  onChange,
  onSave,
  loading,
  allCustomers,
  allVehicles,
}) => {
  let diff = 0
  let priceLabel = 'Price per Month'
  let totalPriceLabel = 'Total Price'
  if (rent.daily) {
    priceLabel = 'Price per Day'
  }

  if (rent.started_at !== '' && rent.finished_at !== '' && rent.price !== '') {
    const calc = new RentCalculator(
      `${rent.started_at} ${rent.time_started_at}`,
      `${rent.finished_at}T${rent.time_finished_at}`,
      rent.price
    )

    if (rent.daily) {
      diff = calc.diffInDays()
      totalPriceLabel = `Total Price : ${diff} days`
    } else {
      diff = calc.diffInMonths()
      totalPriceLabel = `Total Price : ${diff} months`
    }
  }

  const totalPrice = (rent.price * diff).toString()

  return (
    <form>
      <SelectInput
        name="customer_id"
        label="Customer"
        value={rent.customer_id}
        onChange={onChange}
        defaultOption="- Select Customer -"
        options={allCustomers}
      />
      <SelectInput
        name="vehicle_id"
        label="Vehicle"
        value={rent.vehicle_id}
        onChange={onChange}
        defaultOption="- Select Vehicle -"
        options={allVehicles}
      />
      <DateInput
        name="started_at"
        label="Started At"
        value={rent.started_at}
        onChange={onChange}
      />
      <TimePickerInput
        name="time_started_at"
        label="Started Time"
        value={rent.time_started_at}
        onChange={onChange}
      />
      <DateInput
        name="finished_at"
        label="Finished At"
        value={rent.finished_at}
        onChange={onChange}
      />
      <TimePickerInput
        name="time_finished_at"
        label="Finished Time"
        value={rent.time_finished_at}
        onChange={onChange}
      />
      <CheckBoxInput
        name="daily"
        label="Daily"
        value={rent.daily}
        onChange={onChange}
      />
      <NumberInput
        name="price"
        label={priceLabel}
        value={rent.price}
        onChange={onChange}
      />
      <NumberInput
        name="total_price"
        label={totalPriceLabel}
        value={totalPrice}
        readOnly
        onChange={() => console.log('')}
      />
      <button
        type="submit"
        className="btn btn-primary"
        onClick={onSave}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

RentForm.propTypes = {
  rent: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  allCustomers: PropTypes.array.isRequired,
  allVehicles: PropTypes.array.isRequired,
}

RentForm.defaultProps = {
  loading: false,
}

export default RentForm
