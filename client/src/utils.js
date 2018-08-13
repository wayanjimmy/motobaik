import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import axios from 'axios'
import rootReducer from './reducers'

const auth = {
  isAuthenticated() {
    return localStorage.getItem('auth_token') ? true : false
  },
  authenticate(token) {
    localStorage.setItem('auth_token', token)
  },
  signout(cb) {
    localStorage.removeItem('auth_token')
    setTimeout(cb, 100)
  },
  token() {
    return localStorage.getItem('auth_token')
  },
}

export function request() {
  const token = localStorage.getItem('auth_token')
  const request = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  request.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response && error.response.status === 401) {
        auth.signout()
        window.location.reload()
      }
    }
  )

  return request
}

export function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger, promiseMiddleware())
  )
}

export function currency(amount) {
  amount = parseFloat(amount).toFixed(0)
  amount = amount.replace(/(\d)(?=(\d{3})+\b)/g, '$1.')
  return 'Rp ' + amount
}

export function randomString() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  )
}

export function allYears() {
  return [
    { value: '2016', text: '2016' },
    { value: '2017', text: '2017' },
    { value: '2018', text: '2018' },
  ]
}

export function allMonths() {
  return [
    { value: '01', text: 'Jan' },
    { value: '02', text: 'Feb' },
    { value: '03', text: 'Mar' },
    { value: '04', text: 'Apr' },
    { value: '05', text: 'May' },
    { value: '06', text: 'Jun' },
    { value: '07', text: 'Jul' },
    { value: '08', text: 'Aug' },
    { value: '09', text: 'Sep' },
    { value: '10', text: 'Oct' },
    { value: '11', text: 'Nov' },
    { value: '12', text: 'Des' },
  ]
}

export { auth }
