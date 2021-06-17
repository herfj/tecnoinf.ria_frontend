import services from '../api/services'
import { useNavigationBuilder } from '@react-navigation/native'
import { util } from 'prettier'
import {responseErrors} from '../helpers/handleErrors'

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const FETCH_OWNERS = 'FETCH_OWNERS'
const FETCH_OWNER = 'FETCH_OWNER'

const initialState = {
  owners: {},
  owner: null,
}

// ------------------------------------
// Actions
// ------------------------------------

// TODO: check the user's login state
export const fetchOwners = () => {

  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.propietarios
      .fetchAll()
      .then((response) => {
        dispatch({
          type: FETCH_OWNERS,
          owners: response.data,
        })
        dispatch({
          type: LOADING,
          isLoading: false,
        })
      })
      .catch((error) => {
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        console.log(error.message)
      })

  }
}

export const fetchOwner = (ownerId) => {

  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.propietarios
      .fetchById(ownerId)
      .then((response) => {
        dispatch({
          type: FETCH_OWNER,
          owner: response.data,
        })
        dispatch({
          type: LOADING,
          isLoading: false,
        })
      })
      .catch((error) => {
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        console.log(error.message)
      })

  }
}

export const postOwner = (newOwner) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.propietarios
      .postOwner(newOwner)
      .then((response) => {
        dispatch({
          type: FETCH_OWNER,
          owner: response.data,
        })
        dispatch({
          type: LOADING,
          isLoading: false,
        })
      })
      .catch((error) => {
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        console.log(error.message)
      })
  }
}

export const actions = {
  fetchOwners,
  fetchOwner,
  postOwner,
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_OWNERS]: (state, { owners }) => ({
    ...state,
    owners,
  }),
  [FETCH_OWNER]: (state, { owner }) => ({
    ...state,
    owner,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
