import services from '../api/services'
import {initialActionResponse} from "./app.module";
import {validateCreateProject, validatePage} from "../helpers/validations";

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
export const createPage = (Page) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        let finalPage = validatePage(Page);
        services.projects.createPage(finalPage)
            .then(async (response) => {
                await dispatch({
                    type: FETCH_PROJECT,
                    project: response.data,
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

export const getProject = (projectTitle) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        services.projects.fetchProject(projectTitle)
            .then(async (response) => {
                await dispatch({
                    type: FETCH_PROJECT,
                    project: response.data,
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

export const createProject = (newProject) => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        console.log('antes de check', newProject)
        const project = validateCreateProject(newProject)
        console.log("post check", project)
        if (project) {
            services.projects.postProject(project)
                .then(async (response) => {
                    dispatch({
                        type: FETCH_PROJECT,
                        project: response.data,
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
    getProject,
    getAll,
    createProject,
    createPage
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [FETCH_PROJECTS]: (state, {projects}) => ({
        ...state,
        projects,
    }),
    [FETCH_PROJECT]: (state, {project}) => ({
        ...state,
        project,
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
