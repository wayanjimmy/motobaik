import concat from 'lodash/concat'
const initialState = {
  pending: false,
  rents: [],
}

export default function rentReducer(state = initialState, action) {
  if (action.type === 'GET_RENTS_PENDING') {
    return {
      ...state,
      pending: true,
    }
  }

  if (action.type === 'GET_RENTS_FULFILLED') {
    return {
      ...state,
      pending: false,
      rents: action.payload.data,
    }
  }

  if (action.type === 'CREATE_RENT_FULFILLED') {
    const newRent = [action.payload.data]
    return {
      ...state,
      rents: concat(newRent, state.rents),
    }
  }

  return state
}
