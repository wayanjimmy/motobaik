import concat from 'lodash/concat'

const initialState = {
  pending: false,
  vehicles: [],
}

export default function vehicleReducer(state = initialState, action) {
  if (action.type === 'GET_VEHICLES_PENDING') {
    return {
      ...state,
      pending: true,
    }
  }

  if (action.type === 'GET_VEHICLES_FULFILLED') {
    return {
      ...state,
      pending: false,
      vehicles: action.payload.data,
    }
  }

  if (action.type === 'CREATE_VEHICLE_FULFILLED') {
    const newVehicle = [action.payload.data]
    return {
      ...state,
      vehicles: concat(newVehicle, state.vehicles),
    }
  }

  if (action.type === 'UPDATE_VEHICLE_FULFILLED') {
    const updatedVehicle = action.payload.data
    const vehicles = state.vehicles.map(v => {
      if (v.id === updatedVehicle.id) {
        return updatedVehicle
      }
      return v
    })
    return {
      ...state,
      vehicles,
    }
  }

  if (action.type === 'DELETE_VEHICLE_FULFILLED') {
    const deletedVehicle = action.payload.data
    return {
      ...state,
      vehicles: state.vehicles.filter(v => v.id !== deletedVehicle.id),
    }
  }

  return state
}
