import services from '../api/services'
import {responseErrors} from '../helpers/handleErrors'
import {initialActionResponse} from "./app.module";
import {validEmail} from "../helpers/formValidator";
import {validateForUpdateUser, validateLike, validateSignUpUser} from "../helpers/validations";

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const LOGGED_IN = 'LOGGED_IN'
const FETCH_USER = 'FETCH_USER'
const LIKE_PROJECT = 'LIKE_PROJECT'
const ACTION_RESPONSE = 'ACTION_RESPONSE'

const initialState = {
    user: null,
    userDioLike: {
        dio: false,
        projectTitle: null,
        email: null
    }
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
export const updateUser = ({updateUser, isLoading = true}) => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: isLoading,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        const user = validateForUpdateUser(updateUser)
        console.log('primer check',user)
        if (user) {
            console.log('paso primer check',user)
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
export const likeProject = (projectTitle, email)=>{
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        const like = validateLike({
            Titulo: projectTitle,
            Email: email,
        })
        if (like) {
            services.users.likeProject(like)
                .then(async (response) => {
                    services.users.getUser(email)
                        .then(async (response) => {
                            dispatch({
                                type: FETCH_USER,
                                user: response.data,
                            })
                        })
                        .catch((error) => {
                            // error.message = responseErrors(error)
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
                    dispatch({
                        type: LOADING,
                        isLoading: false,
                    })
                })
                .catch((error) => {
                    // error.message = responseErrors(error)
                    console.log('ERROR:', error)

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
export const dioLikeProject = (email,projectTitle)=>{
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: LIKE_PROJECT,
            userDioLike: {
                dio: false,
                projectTitle: null,
                email: null
            }
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        const obj = validateLike({
            Titulo: projectTitle,
            Email: email,
        })
        console.log('antes',obj)
        if (obj) {
            console.log('entrooo',obj)
            services.users.dioLike(obj.Email,obj.Titulo)
                .then(async (response) => {
                    dispatch({
                        type: LIKE_PROJECT,
                        userDioLike: {
                            dio: response.data.Success,
                            projectTitle: obj.Titulo,
                            email: obj.Email,
                        }
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
                        type: LIKE_PROJECT,
                        userDioLike: {
                            dio: false,
                            projectTitle: null,
                            email: null
                        }
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
            dispatch({
                type: LIKE_PROJECT,
                userDioLike: {
                    dio: false,
                    projectTitle: null,
                    email: null
                }
            })
        }
    }
}
export const dislikeProject = (projectTitle, email)=>{
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        const dislike = validateLike({
            Titulo: projectTitle,
            Email: email,
        })
        if (dislike) {
            services.users.dislikeProject(dislike)
                .then(async (response) => {
                    services.users.getUser(email)
                        .then(async (response) => {
                            dispatch({
                                type: FETCH_USER,
                                user: response.data,
                            })
                        })
                        .catch((error) => {
                            // error.message = responseErrors(error)
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
                    dispatch({
                        type: LOADING,
                        isLoading: false,
                    })
                })
                .catch((error) => {
                    // error.message = responseErrors(error)
                    console.log('ERROR:', error)

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
    updateUser,
    likeProject,
    dioLikeProject,
    dislikeProject,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [FETCH_USER]: (state, {user}) => ({
        ...state,
        user,
    }),
    [LIKE_PROJECT]: (state, {userDioLike}) => ({
        ...state,
        userDioLike,
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
