import services from '../api/services'
import { useNavigationBuilder } from '@react-navigation/native'
import { util } from 'prettier'
import {responseErrors} from '../helpers/handleErrors'

// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const ACTION_RESPONSE = 'ACTION_RESPONSE'

const FETCH_CLIENTS = 'FETCH_CLIENTS'
const FETCH_CLIENT = 'FETCH_CLIENT'
const CLIENTS_FILTERS = 'CLIENTS_FILTERS'
const CLIENTS_PAGE = 'CLIENTS_PAGE'

const FETCH_LOCATIONS = 'FETCH_LOCATIONS'

const initialState = {
  clients: {},
  client: null,
  filtersClients: null,
  page: 1,
}

// ------------------------------------
// Actions
// ------------------------------------

// TODO: check the user's login state

export const fetchClients = ({
                               params = {
                                 precio_min: null,
                                 precio_max: null,
                                 dormitorios_minimo: null,
                                 favorito: null,
                                 venta_concretada: null,
                                 compraron_aparte: null,
                                 sin_mas_contacto: null,
                                 type: null,
                                 zonas: null,
                                 dorms: null,
                                 primera_linea: false,
                                 search: null,
                               },
                               nextPage = false,
                               page = 1,
                             }) => {
  return async (dispatch) => {
    if (!nextPage) {
      dispatch({
        type: LOADING,
        isLoading: true,
      })
    }
    dispatch({
      type: CLIENTS_FILTERS,
      filtersClients: params,
    })
    await services.clientes
      .fetchAll({ ...params, page: page })
      .then((response) => {
        dispatch({
          type: FETCH_CLIENTS,
          clients: {
            concat: nextPage,
            data: response.data,
          },
        })
        dispatch({
          type: CLIENTS_PAGE,
          page: {
            nextPage: nextPage,
            pageNumber: page,
          },
        })
        services.ubicaciones
          .fetchAll()
          .then((response) => {
            dispatch({
              type: FETCH_LOCATIONS,
              locations: response.data,
            })
            dispatch({
              type: LOADING,
              isLoading: false,
            })

          })
          .catch((error) => {
            dispatch({
              type: LOADING,
              isLoading: false,
            })
            dispatch({
              type: ACTION_RESPONSE,
              actionResponse: {
                isError: true,
                showModal: true,
                buttonType: 'outline-primary',
                title: 'OOPS!',
                message: 'Ha ocurrido un error al cargar el listing. \n (' + error.message + ')',
                backToHome: true,
              },
            })
            console.log('ERROR FETCH:', error.message)
          })
      })
      .catch((error) => {
        error.message = responseErrors(error)
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        dispatch({
          type: ACTION_RESPONSE,
          actionResponse: {
            isError: true,
            showModal: true,
            buttonType: 'outline-primary',
            title: 'OOPS!',
            message: 'Ha ocurrido un error al cargar el listing. \n (' + error.message + ')',
            backToHome: true,
          },
        })
        console.log('ERROR FETCH:', error.message)
      })
  }
}

export const fetchClient = (clientId) => {

  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.clientes
      .fetchById(clientId)
      .then((response) => {
        dispatch({
          type: FETCH_CLIENT,
          client: response.data,
        })
        dispatch({
          type: LOADING,
          isLoading: false,
        })
      })
      .catch((error) => {
        error.message = responseErrors(error)
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        dispatch({
          type: ACTION_RESPONSE,
          actionResponse: {
            isError: true,
            showModal: true,
            title: 'OOPS!',
            buttonType: 'outline-primary',
            message: 'Ha ocurrido un error al cargar el cliente con Ref #' + clientId + '. \n (' + error.message + ')',
            backToHome: true,
          },
        })
        console.log(error.message)
      })

  }
}

export const fetchDataForNewClient = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    dispatch({
      type: FETCH_CLIENT,
      property: null,
    })
    services.ubicaciones
      .fetchAll()
      .then(async (response) => {
        dispatch({
          type: FETCH_LOCATIONS,
          locations: response.data,
        })
        dispatch({
          type: LOADING,
          isLoading: false,
        })
      })
      .catch((error) => {
        error.message = responseErrors(error)
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        dispatch({
          type: ACTION_RESPONSE,
          actionResponse: {
            isError: true,
            showModal: true,
            title: 'OOPS!',
            buttonType: 'outline-primary',
            message: error.message,
            backToHome: true,
          },
        })
        console.log('errores: ', error)
      })
  }
}

export const updateClient = ({ clientId, data = null, locations = null, properties = null, showModal = true }) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    await services.clientes
      .updateClient(clientId, data, locations, properties)
      .then((response) => {
        dispatch({
          type: FETCH_CLIENT,
          client: response.data,
        })
        dispatch({
          type: LOADING,
          isLoading: false,
        })

      })
      .catch((error) => {
        error.message = responseErrors(error)
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        dispatch({
          type: ACTION_RESPONSE,
          actionResponse: {
            isError: true,
            showModal: true,
            title: 'OOPS!',
            buttonType: 'outline-primary',
            message: 'Ha ocurrido un error al atualizar el cliente con Ref #' + clientId + '. \n (' + error.message + ')',
            backToHome: false,
          },
        })
        console.log('ERROR FETCH:', error.message)
        console.log(error.message)
      })
  }
}

export const postClient = (client, locations) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.clientes
      .postClient(client, locations)
      .then((response) => {
        dispatch({
          type: FETCH_CLIENT,
          client: response.data,
        })
        dispatch({
          type: LOADING,
          isLoading: false,
        })
      })
      .catch((error) => {
        error.message = responseErrors(error)
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        dispatch({
          type: ACTION_RESPONSE,
          actionResponse: {
            isError: true,
            showModal: true,
            title: 'OOPS!',
            buttonType: 'outline-primary',
            message: 'Ha ocurrido un error al crear el cliente. \n (' + error.message + ')',
            backToHome: true,
          },
        })
        console.log(error.message)
      })
  }
}

export const actions = {
  fetchClients,
  fetchClient,
  fetchDataForNewClient,
  updateClient,
  postClient,
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_CLIENTS]: (state, { clients }) => ({
    ...state,
    total_clients: clients.data.total,
    clients: clients.concat ? [...state.clients, ...clients.data.clientes] : clients.data.clientes,
  }),
  [FETCH_CLIENT]: (state, { client }) => ({
    ...state,
    client,
  }),
  [CLIENTS_FILTERS]: (state, { filtersClients }) => ({
    ...state,
    filtersClients,
  }),
  [CLIENTS_PAGE]: (state, { page }) => ({
    ...state,
    page: page.nextPage ? page.pageNumber : 1,
  }),

}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
