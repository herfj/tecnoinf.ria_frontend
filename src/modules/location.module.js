import services from '../api/services'
import { useNavigationBuilder } from '@react-navigation/native'
import { util } from 'prettier'
import {responseErrors} from '../helpers/handleErrors'

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const FETCH_LOCATIONS = 'FETCH_LOCATIONS'

const initialState = {
  locations: {},
}

// ------------------------------------
// Actions
// ------------------------------------

// TODO: check the user's login state
export const fetchLocations = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.ubicaciones
      .fetchAll()
      .then((response) => {
        dispatch({
          type: FETCH_LOCATIONS,
          locations: response.data,
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
  fetchLocations,
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_LOCATIONS]: (state, { locations }) => ({
    ...state,
    locations,
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
