import services from '../api/services'
import {responseErrors} from '../helpers/handleErrors'

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'

const initialState = {
    user: null,
}

// ------------------------------------
// Actions
// ------------------------------------

// TODO: check the user's login state

export const actions = {
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
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
