import concat from 'lodash/concat'

const initialState = {
  pending: false,
  customers: [],
}

export default function customerReducer(state = initialState, action) {
  if (action.type === 'GET_CUSTOMERS_PENDING') {
    return {
      ...state,
      pending: true,
    }
  }

  if (action.type === 'GET_CUSTOMERS_FULFILLED') {
    return {
      ...state,
      pending: false,
      customers: action.payload.data,
    }
  }

  if (action.type === 'CREATE_CUSTOMER_FULFILLED') {
    const newCustomer = [action.payload.data]
    return {
      ...state,
      customers: concat(newCustomer, state.customers),
    }
  }

  if (action.type === 'UPDATE_CUSTOMER_FULFILLED') {
    const updatedCustomer = action.payload.data
    const customers = state.customers.map(c => {
      if (c.id === updatedCustomer.id) {
        return updatedCustomer
      }
      return c
    })
    return {
      ...state,
      customers,
    }
  }

  if (action.type === 'DELETE_CUSTOMER_FULFILLED') {
    const deletedCustomer = action.payload.data
    return {
      ...state,
      customers: state.customers.filter(c => c.id !== deletedCustomer.id),
    }
  }

  return state
}
