import { request } from '../utils'

export function getVehicles() {
  return dispatch => {
    dispatch({
      type: 'GET_VEHICLES',
      payload: request().get('/api/vehicles'),
    })
  }
}

export function createVehicle(vehicle) {
  return dispatch => {
    dispatch({
      type: 'CREATE_VEHICLE',
      payload: request().post('/api/vehicles', vehicle),
    })
  }
}

export function updateVehicle(vehicle) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_VEHICLE',
      payload: request().put(`/api/vehicles/${vehicle.id}`, vehicle),
    })
  }
}

export function deleteVehicle(vehicleId) {
  return dispatch => {
    dispatch({
      type: 'DELETE_VEHICLE',
      payload: request().delete(`/api/vehicles/${vehicleId}`),
    })
  }
}
