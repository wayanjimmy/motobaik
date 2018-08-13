import React from 'react'
import PropTypes from 'prop-types'
import TextInput from './TextInput'

const CustomerForm = ({ customer, onChange, onSave, loading }) => {
  const thereIsEmptyField =
    customer.name === '' || customer.phone === '' || customer.address === ''

  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={customer.name}
        onChange={onChange}
      />
      <TextInput
        name="phone"
        label="Phone"
        value={customer.phone}
        onChange={onChange}
      />
      <TextInput
        name="address"
        label="Address"
        value={customer.address}
        onChange={onChange}
      />
      <button
        type="submit"
        className="btn btn-primary"
        onClick={onSave}
        disabled={loading || thereIsEmptyField}
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

CustomerForm.propTypes = {
  customer: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

CustomerForm.defaultProps = {
  loading: false,
}

export default CustomerForm
