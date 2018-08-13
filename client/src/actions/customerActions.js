import { request } from '../utils'

export function getCustomers() {
  return dispatch => {
    dispatch({
      type: 'GET_CUSTOMERS',
      payload: request().get('/api/customers'),
    })
  }
}

export function createCustomer(customer) {
  return dispatch => {
    dispatch({
      type: 'CREATE_CUSTOMER',
      payload: request().post('/api/customers', customer),
    })
  }
}

export function updateCustomer(customer) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_CUSTOMER',
      payload: request().put(`/api/customers/${customer.id}`, customer),
    })
  }
}

export function deleteCustomer(customerId) {
  return dispatch => {
    dispatch({
      type: 'DELETE_CUSTOMER',
      payload: request().delete(`/api/customers/${customerId}`),
    })
  }
}
