import services from '../api/services'
import {initialActionResponse} from "./app.module";
import {
    validateCategoria,
    validateComment,
    validateCreateProject,
    validatePage
} from "../helpers/validations";
import {validEmail} from "../helpers/formValidator";
import {resolveToLocation} from "react-router-dom/modules/utils/locationUtils";

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const FETCH_PROJECTS = 'FETCH_PROJECTS'
const FETCH_PROJECT = 'FETCH_PROJECT'
const ACTION_RESPONSE = 'ACTION_RESPONSE'
const FETCH_COMMENTS = 'FETCH_COMMENTS'

const initialState = {
    projects: null,
    project: null,
    comments: null,
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
        console.log('afuera', finalPage)
        if (finalPage) {
            console.log('final page adentro', finalPage);
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
        } else {
            dispatch({
                type: LOADING,
                isLoading: false,
            })
        }
    }
}
export const editPagina = (id,cadenita,textito,title) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
            services.projects.editPage(id,cadenita,textito,title)
                .then(async (response) => {
                    services.projects.fetchProject(title)
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
export const getProject = (projectTitle, visto = true) => {
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
                if (visto) {
                    services.projects.visto(projectTitle).then((resolve) => {
                    }).catch((err) => console.log(err))
                }
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
export const getProjectComments = (projectTitle) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        services.comments.getComentariosProyect(projectTitle)
            .then(async (response) => {
                await dispatch({
                    type: FETCH_COMMENTS,
                    comments: response.data,
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
export const postComment = (projectTitle, email, message) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        const cmt = {
            Fecha: new Date().toISOString(),
            Cuerpo: message,
            Usuario: email,
            Proyecto: projectTitle,
        }
        let ctm = validateComment(cmt);
        services.comments.postComment(ctm)
            .then(async (response) => {
                services.comments.getComentariosProyect(projectTitle)
                    .then(async (response) => {
                        await dispatch({
                            type: FETCH_COMMENTS,
                            comments: response.data,
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
export const getMyLikes = (email) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        if(validEmail(email)){
        services.projects.getValorados(email)
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
        }else{
            dispatch({
                type: LOADING,
                isLoading: false,
            })
        }
    }
}
export const getMine = (email) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        if(validEmail(email)){
        services.projects.getMyPJ(email)
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
        }else{
            dispatch({
                type: LOADING,
                isLoading: false,
            })
        }
    }
}
export const getByCats = (category) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        if(validateCategoria(category)){
        services.projects.getPJByCat(category)
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
    }else{
        dispatch({
            type: LOADING,
            isLoading: false,
        })
    }
}}
export const search = (palabra_a_buscar) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            isLoading: true,
        })
        dispatch({
            type: ACTION_RESPONSE,
            actionResponse: initialActionResponse,
        })
        if(validateCategoria(palabra_a_buscar)){
            services.projects.Busqueda(palabra_a_buscar)
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
        }else{
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
    createPage,
    getProjectComments,
    postComment,
    getMyLikes,
    getMine,
    getByCats,
    search,
    editPagina,
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
    [FETCH_COMMENTS]: (state, {comments}) => ({
        ...state,
        comments,
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
