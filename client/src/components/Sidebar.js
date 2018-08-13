import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => (
  <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
    <ul className="nav nav-pills flex-column">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home <span className="sr-only">(current)</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/customers" className="nav-link">
          Customers
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/vehicles" className="nav-link">
          Vehicles
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/rents" className="nav-link">
          Rents
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/reports" className="nav-link">
          Reports
        </Link>
      </li>
    </ul>
  </nav>
)

export default Sidebar
