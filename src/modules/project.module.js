import services from '../api/services'
import {responseErrors} from '../helpers/handleErrors'
import {validateLogin, validateSignUpUser} from "../helpers/validations";
import {initialActionResponse} from "./app.module";

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const FETCH_PROJECTS = 'FETCH_PROJECTS'
const FETCH_PROJECT = 'FETCH_PROJECT'
const ACTION_RESPONSE = 'ACTION_RESPONSE'

const initialState = {
    projects: null,
    project: null,
}

// ------------------------------------
// Actions
// ------------------------------------

export const getAll = () => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        services.projects.fetchAll()
            .then(async (response) => {
                await dispatch({
                    type: FETCH_PROJECTS,
                    projects: response.data,
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


export const actions = {
    getAll,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [FETCH_PROJECTS]: (state, {projects}) => ({
        ...state,
        projects,
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
