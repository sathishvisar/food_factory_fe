/* eslint-disable @typescript-eslint/no-use-before-define */
import { authHeader } from '../_helpers'
import axios from 'axios'

function login (email, password) {
  return axios.post('http://localhost:3000/auth/login', {
    email: email,
    password: password
  })
    // .then(handleResponse)
    .then(function (user) {
      if (user.data.token) {
        localStorage.setItem('user', JSON.stringify(user.data))
      }
      return user.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch('/users', requestOptions).then(handleResponse)
}

function handleResponse (response) {
  console.log(response)
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

export const userService = {
  login,
  logout,
  getAll
}
