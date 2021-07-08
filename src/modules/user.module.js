import services from '../api/services'
import {responseErrors} from '../helpers/handleErrors'
import {initialActionResponse} from "./app.module";

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const FETCH_USER = 'FETCH_USER'
const ACTION_RESPONSE = 'ACTION_RESPONSE'

const initialState = {
    user: null,
}

// ------------------------------------
// Actions
// ------------------------------------

// TODO: check the user's login state
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
export const actions = {
    getUser,

}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [LOADING]: (state, {isLoading}) => ({
        ...state,
        isLoading,
    }),
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
