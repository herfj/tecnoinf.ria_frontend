import services from '../api/services'
import {responseErrors} from '../helpers/handleErrors'
import {validateLogin, validateSignUpUser} from "../helpers/validations";

// ------------------------------------
// Constants
// ------------------------------------

const LOGGED_IN = 'LOGGED_IN'
const LOADING = 'LOADING'
const ACTION_RESPONSE = 'ACTION_RESPONSE'

export const initialActionResponse = {
    isError: false,
    title: '',
    message: '',
    backToHome: false,
}

const initialState = {
    loggedIn: false,
    checked: false,
    isLoading: false,
    loggedUser: null,
    actionResponse: initialActionResponse,
}

// ------------------------------------
// Functions
// ------------------------------------
export const setUser = async (user) => {
    try {
        await localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
        return 'error';
    }

}

export const getUser =  async  () => {
    var user = await JSON.parse(localStorage.getItem('user'));
    return user;
}


// ------------------------------------
// Actions
// ------------------------------------

export const validate = () => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        let user = await getUser();
        if (user != null && validateSignUpUser(user) != false) {
            const loginData = validateLogin(user.Email, user.Password)
            if (loginData) {
                services.auth.login(loginData)
                    .then(async (response) => {
                        await setUser(response.data);
                        await dispatch({
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
                        console.log(error.message)
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
            }
        } else {
            await setUser(null)
            dispatch({
                type: LOGGED_IN,
                loggedIn: false,
                loggedUser: null,
            })
            dispatch({
                type: LOADING,
                isLoading: false,
            })
        }
    }
}
export const authenticate = (email, pass) => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        const loginData = validateLogin(email, pass)
        if (loginData) {
            services.auth.login(loginData)
                .then(async (response) => {
                    setUser(response.data)
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
                    setUser(null)
                    error.message = responseErrors(error)
                    console.log(error.message)
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
        }
    }
}
export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: LOGGED_IN,
            loggedIn: false,
            loggedUser: null,
        })
        await setUser(null)
        dispatch({
            type: LOADING,
            isLoading: false,
        })
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
            services.auth.signUp({...user,
                Descripcion: '',
            })
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
export const isLoading = (isLoading) => (dispatch) =>
    dispatch({
        type: LOADING,
        isLoading,
    })

export const actions = {
    validate,
    authenticate,
    signUp,
    logout,
    isLoading,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [LOGGED_IN]: (state, {loggedIn, checked, loggedUser}) => ({
        ...state,
        loggedIn,
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
