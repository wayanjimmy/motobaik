import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions/authActions'
import {
  FormSignin,
  FormControl,
  InputEmail,
  InputPassword,
} from '../theme/globalStyle'

class Login extends Component {
  state = {
    redirectToReferrer: false,
    form: {
      email: '',
      password: '',
    },
  }

  login = e => {
    e.preventDefault()

    const { email, password } = this.state.form
    this.props.dispatch(actions.login(email, password))
  }

  onInputChange = e => {
    const { form } = this.state
    form[e.target.name] = e.target.value
    this.setState({ form })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.setState({ redirectToReferrer: true })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer, form } = this.state
    const isButtonDisabled = form.email === '' || form.password === ''

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <FormSignin>
          <form>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <FormControl>
              <InputEmail>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={this.onInputChange}
                />
              </InputEmail>
            </FormControl>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <FormControl>
              <InputPassword>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={this.onInputChange}
                />
              </InputPassword>
            </FormControl>
            <button
              className="btn btn-lg btn-primary btn-block"
              onClick={this.login}
              disabled={isButtonDisabled}
            >
              Login
            </button>
          </form>
        </FormSignin>
      </div>
    )
  }
}

export default connect(state => {
  const { token } = state.auth

  return {
    token,
  }
})(Login)
