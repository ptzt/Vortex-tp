import {
  GET_USERS,
  DELETE_USERS,
  ADD_USER,
  GET_SINGLE_USER,
  UPDATE_USER,
} from '../common/constants'

const initialState = {
  users: [],
  user: {},
  loading: true,
}

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case DELETE_USERS:
      return {
        ...state,
        loading: false,
      }
    case ADD_USER:
      return {
        ...state,
        loading: false,
      }
    case GET_SINGLE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default usersReducers
