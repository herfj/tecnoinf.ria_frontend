import services from '../api/services'
import {responseErrors} from '../helpers/handleErrors'

// ------------------------------------
// Constants
// ------------------------------------

const LOGGED_IN = 'LOGGED_IN'
const LOADING = 'LOADING'
const ACTION_RESPONSE = 'ACTION_RESPONSE'

const initialActionResponse = {
    isError: false,
    title: '',
    message: '',
    backToHome: false,
}

const initialState = {
    checked: false,
    loggedIn: false,
    isLoading: false,
    loggedUser: null,
    actionResponse: initialActionResponse,
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
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        services.auth.login(data)
            .then(async (response) => {

                dispatch({
                    type: LOGGED_IN,
                    loggedIn: true,
                    checked: true,
                    loggedUser: response.data,
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
                dispatch({
                    type: ACTION_RESPONSE,
                    actionResponse: {
                        isError: true,
                        title: '',
                        message: error.message,
                        backToHome: false,
                    },
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
    [LOGGED_IN]: (state, {loggedIn, checked, loggedUser}) => ({
        ...state,
        loggedIn,
        checked,
        loggedUser,
    }),
    [LOADING]: (state, {isLoading}) => ({
        ...state,
        isLoading,
    }),
    [ACTION_RESPONSE]: (state, {actionResponse}) => ({
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
