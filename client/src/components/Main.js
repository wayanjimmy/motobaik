import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Customers from './Customers'
import Vehicles from './Vehicles'
import Rents from './Rents'
import ManageCustomerForm from './ManageCustomerForm'
import ManageVehicleForm from './ManageVehicleForm'
import ManageRentForm from './ManageRentForm'
import Reports from './Reports'
import { auth } from '../utils'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )}
  />
)

const Main = () => (
  <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/customers/new" component={ManageCustomerForm} />
      <PrivateRoute path="/customers/:id" component={ManageCustomerForm} />
      <PrivateRoute path="/customers" component={Customers} />
      <PrivateRoute path="/vehicles/new" component={ManageVehicleForm} />
      <PrivateRoute path="/vehicles/:id" component={ManageVehicleForm} />
      <PrivateRoute path="/vehicles" component={Vehicles} />
      <PrivateRoute path="/rents/new" component={ManageRentForm} />
      <PrivateRoute path="/rents" component={Rents} />
      <PrivateRoute path="/reports" component={Reports} />
    </Switch>
  </main>
)

export default Main
