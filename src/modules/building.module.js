import services from '../api/services'
import { useNavigationBuilder } from '@react-navigation/native'
import { util } from 'prettier'
import {responseErrors} from '../helpers/handleErrors'

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const FETCH_BUILDINGS = 'FETCH_BUILDINGS'
const FETCH_BUILDING = 'FETCH_BUILDING'

const initialState = {
  buildings: {},
  building: {},
}

// ------------------------------------
// Actions
// ------------------------------------

// TODO: check the user's login state
export const fetchBuildings = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    await services.edit
      .fetchAll()
      .then((response) => {
        dispatch({
          type: FETCH_BUILDINGS,
          buildings: response.data,
        })
        dispatch({
          type: LOADING,
          isLoading: false,
        })

      })
      .catch((error) => {
        error.message = responseErrors(error)
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        console.log(error.message)
      })
  }
}

export const fetchBuilding = (buildingId) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    await services.edificios
      .fetchById(buildingId)
      .then((response) => {
        dispatch({
          type: FETCH_BUILDING,
          building: response.data,
        })
        dispatch({
          type: LOADING,
          isLoading: false,
        })
      })
      .catch((error) => {
        error.message = responseErrors(error)
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        console.log(error.message)
      })
  }
}

export const actions = {
  fetchBuildings,
  fetchBuilding,
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_BUILDINGS]: (state, { buildings }) => ({
    ...state,
    buildings
  }),
  [FETCH_BUILDING]: (state, { building }) => ({
    ...state,
    building,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
