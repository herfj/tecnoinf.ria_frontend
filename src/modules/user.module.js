import services from '../api/services'
import {responseErrors} from '../helpers/handleErrors'
import {initialActionResponse} from "./app.module";
import {validEmail} from "../helpers/formValidator";
import {validateForUpdateUser, validateSignUpUser} from "../helpers/validations";

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const LOGGED_IN = 'LOGGED_IN'
const FETCH_USER = 'FETCH_USER'
const ACTION_RESPONSE = 'ACTION_RESPONSE'

const initialState = {
    user: null,
}

// ------------------------------------
// Actions
// ------------------------------------

// TODO: check the user's login state
export const followUser = (emailseguidor, emailseguido) => {
    return (dispatch) => {
        if (validEmail(emailseguido) && validEmail(emailseguidor)) {
            dispatch({
                type: LOADING,
                isLoading: true,
            })
            dispatch({
                type: ACTION_RESPONSE,
                actionResponse: initialActionResponse,
            })
            services.users.followUser(emailseguidor, emailseguido)
                .then(async (response) => {
                    dispatch({
                        type: FETCH_USER,
                        user: response.data,
                    })
                    dispatch({
                        type: LOADING,
                        isLoading: false,
                    })

                })
                .catch((err)=>{
                    dispatch({
                        type: LOADING,
                        isLoading: false,
                    })
                    dispatch({
                        type: ACTION_RESPONSE,
                        actionResponse: {
                            isError: true,
                            title: '',
                            message: err.message,
                            backToHome: false,
                        },
                    })
                })
        } else {
            dispatch({
                type: LOADING,
                isLoading: false,
            })
            dispatch({
                type: ACTION_RESPONSE,
                actionResponse: {
                    isError: true,
                    title: '',
                    message: 'no se pudo validar ',
                    backToHome: false,
                },
            })
        }
    }
}
export const unfollowUser = (emailseguidor, emailseguido) => {
    return (dispatch) => {
        if (validEmail(emailseguido) && validEmail(emailseguidor)) {
            dispatch({
                type: LOADING,
                isLoading: true,
            })
            dispatch({
                type: ACTION_RESPONSE,
                actionResponse: initialActionResponse,
            })
            services.users.unfollowUser(emailseguidor, emailseguido)
                .then(async (response) => {
                    dispatch({
                        type: FETCH_USER,
                        user: response.data,
                    })
                    dispatch({
                        type: LOADING,
                        isLoading: false,
                    })

                })
                .catch((err)=>{
                    dispatch({
                        type: LOADING,
                        isLoading: false,
                    })
                    dispatch({
                        type: ACTION_RESPONSE,
                        actionResponse: {
                            isError: true,
                            title: '',
                            message: err.message,
                            backToHome: false,
                        },
                    })
                })
        } else {
            dispatch({
                type: LOADING,
                isLoading: false,
            })
            dispatch({
                type: ACTION_RESPONSE,
                actionResponse: {
                    isError: true,
                    title: '',
                    message: 'ashi',
                    backToHome: false,
                },
            })
        }
    }
}
export const getUser = (email) => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        services.users.getUser(email)
            .then(async (response) => {
                dispatch({
                    type: FETCH_USER,
                    user: response.data,
                })
                dispatch({
                    type: LOADING,
                    isLoading: false,
                })

            })
            .catch((error) => {
                // error.message = responseErrors(error)
                console.log(error.message)
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
export const updateUser = ({newUser, isLoading = true}) => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: isLoading,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        const user = validateForUpdateUser(newUser)
        if (user) {
            services.users.updateUser(user)
                .then(async (response) => {
                    dispatch({
                        type: LOGGED_IN,
                        loggedIn: true,
                        loggedUser: response.data,
                    })
                    dispatch({
                        type: LOADING,
                        isLoading: false,
                    })
                })
                .catch((error) => {
                    // error.message = responseErrors(error)
                    console.log('ERROR:', error)
                    dispatch({
                        type: LOGGED_IN,
                        loggedIn: false,
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
export const actions = {
    getUser,
    followUser,
    unfollowUser,
    updateUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [FETCH_USER]: (state, {user}) => ({
        ...state,
        user,
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
