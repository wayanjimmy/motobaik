import { combineReducers } from 'redux'
import customer from './customerReducer'
import auth from './authReducer'
import vehicle from './vehicleReducer'
import rent from './rentReducer'

const rootReducer = combineReducers({
  customer,
  auth,
  vehicle,
  rent,
})

export default rootReducer
