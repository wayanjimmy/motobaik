import { request } from '../utils'

export function updateCompanyCashes(company_cashes) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_COMPANY_CASHES',
      payload: request().post('/api/company_cash', {
        company_cashes,
      }),
    })
  }
}
