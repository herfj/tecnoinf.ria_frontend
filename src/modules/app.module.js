import services from '../api/services'
import {responseErrors} from '../helpers/handleErrors'
import {validateLogin, validateSignUpUser} from "../helpers/validations";

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
        Email: email,
        Password: pass,
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
        const loginData = validateLogin(email,pass)
        if (loginData) {
            services.auth.login(loginData)
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
                    console.log(error.message)
                    dispatch({
                        type: LOGGED_IN,
                        loggedIn: false,
                        checked: false,
                        loggedUser: null,
                    })
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
}

export const signUp = ({newUser, isLoading = true}) => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: isLoading,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        const user = validateSignUpUser(newUser)
        if (user) {
            services.auth.signUp(user)
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
                    // error.message = responseErrors(error)
                    console.log('ERROR:',error)
                    dispatch({
                        type: LOGGED_IN,
                        loggedIn: false,
                        checked: false,
                        loggedUser: null,
                    })
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

export const actions = {
    authenticate,
    signUp,
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
