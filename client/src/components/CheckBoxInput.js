import React from 'react'
import PropTypes from 'prop-types'

const CheckBoxInput = ({ name, label, onChange, placeholder, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="checkbox"
        name={name}
        className="form-control"
        id={name}
        placeholder={placeholder}
        checked={value}
        onChange={onChange}
      />
    </div>
  )
}

CheckBoxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.bool,
}

export default CheckBoxInput
