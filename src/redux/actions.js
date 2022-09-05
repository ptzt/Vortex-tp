import * as types from './actionType'
import axios from 'axios'

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
})

const userDeleted = () => ({
  type: types.DELETE_USERS,
})

const userAdd = () => ({
  type: types.ADD_USER,
})

const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
})

const userUpdate = () => ({
  type: types.UPDATE_USER,
})

const URL = 'http://localhost:5000/user'

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(URL)
      .then((res) => {
        console.log('res', res)
        dispatch(getUsers(res.data))
      })
      .catch((err) => console.log(err))
  }
}

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${URL}/${id}`)
      .then((res) => {
        console.log('res', res)
        dispatch(userDeleted())
        dispatch(loadUsers())
      })
      .catch((err) => console.log(err))
  }
}

export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(URL, user)
      .then((res) => {
        console.log('res', res)
        dispatch(userAdd())
        dispatch(loadUsers())
      })
      .catch((err) => console.log(err))
  }
}

export const getSingleUser = (id) => {
  return function (dispatch) {
    axios
      .get(`${URL}/${id}`)
      .then((res) => {
        console.log('res', res)
        dispatch(getUser(res.data))
      })
      .catch((err) => console.log(err))
  }
}

export const updateUser = (user, id) => {
  return function (dispatch) {
    axios
      .put(`${URL}/${id}`, user)
      .then((res) => {
        console.log('res', res)
        dispatch(userUpdate())
      })
      .catch((err) => console.log(err))
  }
}
