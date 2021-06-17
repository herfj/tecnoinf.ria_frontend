import services from '../api/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responseErrors } from '../helpers/handleErrors'

// ------------------------------------
// Constants
// ------------------------------------

const LOGGED_IN = 'LOGGED_IN'
const LOADING = 'LOADING'
const ACTION_RESPONSE = 'ACTION_RESPONSE'

const initialActionResponse = {
  isError: false,
  showModal: false,
  buttonType: 'outline-primary',
  modalTitle: '',
  modalText: '',
  backToHome: false,
}

const initialState = {
  checked: false,
  loggedIn: false,
  isLoading: false,
  actionResponse: initialActionResponse,
  user: null,
}

// ------------------------------------
// Actions
// ------------------------------------

// TODO: check the user's login state
export const authenticate = (email, pass) => {
  const data = {
    email: email,
    password: pass,
  }
  return (dispatch) => {
    dispatch({
      type: ACTION_RESPONSE,
      actionResponse: initialActionResponse,
    })
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.auth.login(data)
      .then(async (response) => {
        const headers = response.headers
        //Create the object to store
        const toStore = {
          accessToken: headers['access-token'],
          tokenType: headers['token-type'],
          client: headers['client'],
          expiry: headers['expiry'],
          uid: headers['uid'],
        }
        try {
          await AsyncStorage.setItem('auth-credentials', JSON.stringify(toStore))
          dispatch({
            type: LOGGED_IN,
            loggedIn: true,
            checked: true,
            user: response.data.data,
          })
        } catch (e) {
          console.log(e.message)   // saving error
        }
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
        dispatch({
          type: ACTION_RESPONSE,
          actionResponse: {
            isError: true,
            showModal: true,
            buttonType: 'outline-primary',
            title: 'OOPS!',
            message: error.message,
            backToHome: false,
          },
        })
      })
  }
}

export const checkCredentials = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    if (services.auth.hasCredentials()) {
      services.auth.checkCredentials()
        .then(async (response) => {
          if (response.success) {
            dispatch({
              type: LOGGED_IN,
              loggedIn: true,
              checked: true,
              user: response.data,
            })
          }
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
    } else {
      dispatch({
        type: LOADING,
        isLoading: false,
      })
    }
  }
}

export const isLoading = (isLoading) => (dispatch) =>
  dispatch({
    type: LOADING,
    isLoading,
  })

export const resetActionResponse = () => (dispatch) =>
  dispatch({
    type: ACTION_RESPONSE,
    actionResponse: initialActionResponse,
  })

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: ACTION_RESPONSE,
      actionResponse: initialActionResponse,
    })
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.auth.signOut()
      .then(() => {
        dispatch({
          type: LOGGED_IN,
          loggedIn: false,
          checked: false,
        })
        dispatch({
          type: LOADING,
          isLoading: false,
        })
      })
  }
}

export const actions = {
  authenticate,
  checkCredentials,
  isLoading,
  resetActionResponse,
  signOut,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [LOGGED_IN]: (state, { loggedIn, checked, user }) => ({
    ...state,
    loggedIn,
    checked,
    user,
  }),
  [LOADING]: (state, { isLoading }) => ({
    ...state,
    isLoading,
  }),
  [ACTION_RESPONSE]: (state, { actionResponse }) => ({
    ...state,
    actionResponse,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
