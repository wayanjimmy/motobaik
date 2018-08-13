import React from 'react'
import PropTypes from 'prop-types'

const NumberInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        name={name}
        className="form-control"
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  )
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}

export default NumberInput
