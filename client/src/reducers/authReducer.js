import { auth } from '../utils'
const initialState = {
  token: null,
}

export default function authReducer(state = initialState, action) {
  if (action.type === 'LOGIN_FULFILLED') {
    const token = action.payload.data.auth_token
    auth.authenticate(token)
    return {
      ...state,
      token,
    }
  }
  return state
}
