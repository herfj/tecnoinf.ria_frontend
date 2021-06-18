import services from '../api/services'
import {responseErrors} from '../helpers/handleErrors'

// ------------------------------------
// Constants
// ------------------------------------

const LOGGED_IN = 'LOGGED_IN'
const LOADING = 'LOADING'


const initialState = {
    checked: false,
    loggedIn: false,
    isLoading: false,
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
            type: LOADING,
            isLoading: true,
        })
        services.auth.login(data)
            .then(async (response) => {

                dispatch({
                    type: LOGGED_IN,
                    loggedIn: true,
                    checked: true,
                    user: response.data.data,
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

            })
    }
}

export const isLoading = (isLoading) => (dispatch) =>
    dispatch({
        type: LOADING,
        isLoading,
    })

export const actions = {
    authenticate,
    isLoading,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [LOGGED_IN]: (state, {loggedIn, checked, user}) => ({
        ...state,
        loggedIn,
        checked,
        user,
    }),
    [LOADING]: (state, {isLoading}) => ({
        ...state,
        isLoading,
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
