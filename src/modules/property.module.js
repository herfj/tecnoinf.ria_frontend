import services from '../api/services'
import store from 'utils/store'
import { useNavigationBuilder } from '@react-navigation/native'
import { util } from 'prettier'
import { responseErrors } from '../helpers/handleErrors'
// any js module

// ...


// ------------------------------------
// Constants
// ------------------------------------

const LOADING = 'LOADING'
const ACTION_RESPONSE = 'ACTION_RESPONSE'

const FETCH_PROPERTIES = 'FETCH_PROPERTIES'
const FETCH_PROPERTY = 'FETCH_PROPERTY'
const PROPERTIES_FILTERS = 'PROPERTIES_FILTERS'

const ORDER_PHOTOS = 'ORDER_PHOTOS'
const UPDATE_PHOTO = 'UPDATE_PHOTO'
const DELETE_PHOTO = 'DELETE_PHOTO'

const FETCH_BUILDINGS = 'FETCH_BUILDINGS'
const FETCH_LOCATIONS = 'FETCH_LOCATIONS'
const FETCH_OWNERS = 'FETCH_OWNERS'
const FETCH_OWNER = 'FETCH_OWNER'
const PROPERTIES_PAGE = 'PROPERTIES_PAGE'

const initialState = {
  properties: [],
  total_properties: null,
  property: null,
  filters: {
    precio_min: null,
    precio_max: null,
    type: null,
    zonas: null,
    dorms: null,
    primera_linea: false,
    inactivas: false,
    search: null,
  },
  page: 1,
}

// ------------------------------------
// Actions
// ------------------------------------

// TODO: check the user's login state
export const fetchProperties = ({
                                  params = {
                                    precio_min: null,
                                    precio_max: null,
                                    type: null,
                                    zonas: null,
                                    dorms: null,
                                    primera_linea: false,
                                    inactivas: false,
                                    search: null,
                                  },
                                  nextPage = false,
                                  page = 1,
                                  loading = true,
                                }) => {
  return async (dispatch) => {
    if (!nextPage) {
      dispatch({
        type: LOADING,
        isLoading: loading,
      })
    }
    dispatch({
      type: PROPERTIES_FILTERS,
      filters: params,
    })
    await services.propiedades
      .fetchAll({ ...params, page: page })
      .then((response) => {
        dispatch({
          type: FETCH_PROPERTIES,
          properties: {
            concat: nextPage,
            data: response.data,
          },
        })
        dispatch({
          type: PROPERTIES_PAGE,
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

export const fetchProperty = (propertyId) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    await services.propiedades
      .fetchById(propertyId)
      .then((response) => {
        dispatch({
          type: FETCH_PROPERTY,
          property: response.data,
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
            buttonType: 'outline-primary',
            title: 'OOPS!',
            message: 'Ha ocurrido un error al cargar la propiedad con Ref #' + propertyId + '. \n (' + error.message + ')',
            backToHome: true,
          },
        })
        console.log('ERROR FETCH:', error.message)
        console.log(error.message)
      })
  }
}

export const fetchDataForNewProperty = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    dispatch({
      type: FETCH_OWNER,
      owner: null,
    })
    dispatch({
      type: FETCH_PROPERTY,
      property: null,
    })
    services.ubicaciones
      .fetchAll()
      .then(async (response) => {
        dispatch({
          type: FETCH_LOCATIONS,
          locations: response.data,
        })
        services.propietarios
          .fetchAll()
          .then((response) => {
            dispatch({
              type: FETCH_OWNERS,
              owners: response.data,
            })
            services.edificios.fetchAll()
              .then((response) => {
                dispatch({
                  type: FETCH_BUILDINGS,
                  buildings: response.data,
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
                console.log(error.message)
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
            console.log(error.message)
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

export const updateProperty = (propertyId, data, showModal = true) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    await services.propiedades
      .updateProperty(propertyId, data)
      .then((response) => {
        dispatch({
          type: FETCH_PROPERTY,
          property: response.data,
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
            message: 'Ha ocurrido un error al atualizar la propiedad con Ref #' + propertyId + '. \n (' + error.message + ')',
            backToHome: false,
          },
        })
        console.log('ERROR FETCH:', error.message)
        console.log(error.message)
      })
  }
}

export const postProperty = (property, contacts) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.propiedades
      .postProperty(property, contacts)
      .then((response) => {
        dispatch({
          type: FETCH_PROPERTY,
          property: response.data,
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
            message: 'Ha ocurrido un error al crear la propiedad. \n (' + error.message + ')',
            backToHome: true,
          },
        })
        console.log(error.message)
      })
  }
}

export const sendEmail = (mail) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    await services.propiedades
      .sendEmail(mail)
      .then((response) => {
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        dispatch({
          type: ACTION_RESPONSE,
          actionResponse: {
            isError: false,
            buttonType: 'success',
            showModal: true,
            title: 'MAIL ENVIADO!',
            message: 'El mail con destinatario: ' + mail.to + ' se ha enviado exitosamente.',
            backToHome: false,
          },
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
            message: 'Ha ocurrido un error al intentar enviar el mail. \n (' + error.message + ')',
            backToHome: true,
          },
        })
        console.log(error.message)
      })
  }
}

// -------------------------
// Actions Photos de propiedad
// -------------------------

export const orderPhotos = (propertyId, arrayId) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.propiedades
      .orderPhotos(propertyId, arrayId)
      .then((response) => {
        dispatch({
          type: ORDER_PHOTOS,
          property: response.data,
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
            message: 'Ha ocurrido un error al intentar ordenar las fotos. \n (' + error.message + ')',
            backToHome: true,
          },
        })
        console.log(error.message)
      })

  }
}

export const updatePhoto = (photoId, data) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.propiedades
      .updatePhoto(photoId, data)
      .then((response) => {
        dispatch({
          type: UPDATE_PHOTO,
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
            message: 'Ha ocurrido un error al intentar actualizar la foto #' + photoId + '. \n (' + error.message + ')',
            backToHome: true,
          },
        })
        console.log(error.message)
      })
  }
}

export const uploadPhotos = (propertyId, photos) => {
  return async (dispatch) => {
    await services.propiedades
      .uploadPhotos(propertyId, photos)
      .then((response) => {
        dispatch({
          type: LOADING,
          isLoading: false,
        })
        if (response.data) {
          dispatch({
            type: FETCH_PROPERTY,
            property: response.data,
          })
        }

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
            message: 'Ha ocurrido un error al intentar cargar la/s foto/s. \n (' + error.message + ')',
            backToHome: true,
          },
        })
        console.log(error.message)
      })
  }
}

export const deletePhoto = (photoId) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      isLoading: true,
    })
    services.propiedades
      .deletePhoto(photoId)
      .then((response) => {
        dispatch({
          type: DELETE_PHOTO,
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
            message: 'Ha ocurrido un error al intentar eliminar la foto #' + photoId + '. \n (' + error.message + ')',
            backToHome: true,
          },
        })
        console.log(error.message)
      })

  }
}

export const actions = {
  fetchProperties,
  fetchProperty,
  fetchDataForNewProperty,
  updateProperty,
  postProperty,
  sendEmail,
  orderPhotos,
  uploadPhotos,
  updatePhoto,
  deletePhoto,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_PROPERTIES]: (state, { properties }) => ({
    ...state,
    total_properties: properties.data.total,
    properties: properties.concat ? [...state.properties, ...properties.data.propiedades] : properties.data.propiedades,
  }),
  [FETCH_PROPERTY]: (state, { property }) => ({
    ...state,
    property,
  }),
  [PROPERTIES_FILTERS]: (state, { filters }) => ({
    ...state,
    filters,
  }),
  [PROPERTIES_PAGE]: (state, { page }) => ({
    ...state,
    page: page.nextPage ? page.pageNumber : 1,
  }),
  [ORDER_PHOTOS]: (state, { property }) => ({
    ...state,
    property,
  }),
  [UPDATE_PHOTO]: (state) => ({
    ...state,
  }),
  [DELETE_PHOTO]: (state, { property }) => ({
    ...state,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
