import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ title }) => (
  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a className="navbar-brand" style={{ color: 'white' }}>
      {title}
    </a>
    <button className="navbar-toggler d-lg-none" type="button">
      <span className="navbar-toggler-icon" />
    </button>
  </nav>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

Header.defaultProps = {
  title: 'RROR',
}

export default Header
