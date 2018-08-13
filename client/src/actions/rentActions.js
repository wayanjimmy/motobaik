import { request } from '../utils'

export function getRents(year = '', month = '', customer = '') {
  return dispatch => {
    dispatch({
      type: 'GET_RENTS',
      payload: request().get(`/api/rents?year=${year}&month=${month}&customer=${customer}`),
    })
  }
}

export function createRent(rent) {
  return dispatch => {
    dispatch({
      type: 'CREATE_RENT',
      payload: request().post('/api/rents', rent),
    })
  }
}

export function updateRent(rent) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_RENT',
      payload: request().put(`/api/rents/${rent.id}`, rent),
    })
  }
}
