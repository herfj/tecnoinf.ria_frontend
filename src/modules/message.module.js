import services from '../api/services'
import {responseErrors} from '../helpers/handleErrors'
import {validateMess} from "../helpers/validations";
import {initialActionResponse} from "./app.module";

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const ACTION_RESPONSE = 'ACTION_RESPONSE'

const FETCH_INBOX = 'FETCH_INBOX'
const FETCH_SENT = 'FETCH_SENT'
const FETCH_MESSAGE = 'FETCH_MESSAGE'

const initialState = {
    sent: null,
    inbox: null,
    message: null,
}

// ------------------------------------
// Actions
// ------------------------------------
//!p el tren del olvido sonido profesional

export const getMsg = (id) => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        services.messages.getMsg(id)
            .then(async (response) => {
                dispatch({
                    type: FETCH_MESSAGE,
                    message: response.data,
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
export const clavarElVisto = (id, logEmail, remitente) => {
    console.log(id,logEmail,remitente,logEmail === remitente);
    return (dispatch) => {
        if (logEmail === remitente) {
            dispatch({
                type: LOADING,
                isLoading: true,
            })
            dispatch({
                type: ACTION_RESPONSE,
                actionResponse: initialActionResponse,
            })
            services.messages.clavarElVistoo(id)
                .then(async (response) => {
                    dispatch({
                        type: LOADING,
                        isLoading: false,
                    })
                })
                .catch((error) => {
                    error.message = responseErrors(error)
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
        } else {
            dispatch({
                type: ACTION_RESPONSE,
                actionResponse: {
                    isError: true,
                    title: '',
                    message: 'No sos el remitente',
                    backToHome: false,
                },
            })
        }
    }
}
export const getInbox = (email) => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        services.messages.getInbox(email)
            .then(async (response) => {
                dispatch({
                    type: FETCH_INBOX,
                    inbox: response.data,
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
export const getSent = (email) => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        services.messages.getSent(email)
            .then(async (response) => {
                dispatch({
                    type: FETCH_SENT,
                    sent: response.data,
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
export const sendMessage = ({message}) => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        const messData = validateMess(message)
        if (messData) {
            services.messages.sendMessagee(messData)
                .then(async (response) => {
                    dispatch({
                        type: LOADING,
                        isLoading: false,
                    })

                })
                .catch((error) => {
                    error.message = responseErrors(error)
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
        else{
            dispatch({
                type: LOADING,
                isLoading: false,
            })
            dispatch({
                type: ACTION_RESPONSE,
                actionResponse: {
                    isError: true,
                    title: '',
                    message: 'anda a otro lado',
                    backToHome: false,
                },
            })
        }
    }
}

export const actions = {
    getInbox,
    getSent,
    sendMessage,
    getMsg,
    clavarElVisto,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [FETCH_INBOX]: (state, {inbox}) => ({
        ...state,
        inbox,
    }),
    [FETCH_SENT]: (state, {sent}) => ({
        ...state,
        sent,
    }),
    [FETCH_MESSAGE]: (state, {message}) => ({
        ...state,
        message,
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
