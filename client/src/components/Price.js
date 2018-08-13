import React from 'react'
import PropTypes from 'prop-types'
import { currency } from '../utils'

const Price = ({ value }) => <span>{currency(value)}</span>

Price.propTypes = {
  value: PropTypes.number.isRequired,
}

Price.defaultProps = {
  value: 0,
}

export default Price
