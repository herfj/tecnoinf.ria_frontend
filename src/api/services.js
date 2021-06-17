import axiosHttp from 'axios'
import { API_URL } from '../config/api_config'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axios = axiosHttp.create({ timeout: 30000 })

const buildPaginationData = (path, paginationData) => {
  if (paginationData) {
    path += '?'
    if (paginationData.page) {
      path += `page=${paginationData.page}&`
    }
    if (paginationData.search) {
      path += `search=${paginationData.search}&`
    }
    if (paginationData.order && paginationData.sort) {
      path += `order=${paginationData.order}&sort=${paginationData.sort}`
    }
    //Filters
    if (paginationData.precio_min) {
      path += `precio_min=${paginationData.precio_min}&`
    }
    if (paginationData.precio_max) {
      path += `precio_max=${paginationData.precio_max}&`
    }
    if (paginationData.type && paginationData.type.length > 0) {
      paginationData.type.forEach((type) => {
        path += `type[]=${type}&`
      })
    }
    if (paginationData.zonas && paginationData.zonas.length > 0) {
      paginationData.zonas.forEach((zona) => {
        path += `zonas[]=${zona}&`
      })
    }
    if (paginationData.dorms && paginationData.dorms.length > 0) {
      paginationData.dorms.forEach((dorm) => {
        path += `dorms[]=${dorm}&`
      })
    }
    if (paginationData.primera_linea) {
      path += `primera_linea=1&`
    }
    if (paginationData.inactivas) {
      path += `inactivas=1&`
    }
    if (paginationData.sin_mas_contacto) {
      path += `sin_mas_contacto=1&`
    }
    if (paginationData.compraron_aparte) {
      path += `compraron_aparte=1&`
    }
    if (paginationData.venta_concretada) {
      path += `venta_concretada=1&`
    }
    if (paginationData.favorito) {
      path += `favorito=1&`
    }
  }
  return path
}

const getAuthCredentials = async () => {
  try {
    const jsonAuthCredentials = await AsyncStorage.getItem('auth-credentials')
    const authCredentials = jsonAuthCredentials != null ? JSON.parse(jsonAuthCredentials) : null
    if (authCredentials !== null) {
      const headers = {
        'access-token': authCredentials.accessToken,
        'token-type': authCredentials.tokenType,
        'client': authCredentials.client,
        'expiry': authCredentials.expiry,
        'uid': authCredentials.uid,
      }

      return headers
    } else {
      return null
    }
  } catch (e) {
    console.log(e.message)   // saving error
    return null
  }
}

export default {
  auth: {
    login(data) {
      return axios.post(API_URL + '/api/v1/auth/sign_in', data)
    },
    forgotPassword(data) {
      return axios.post(API_URL + '/users/forgot_password', data)
    },
    resetPassword(data) {
      return axios.post(API_URL + '/users/password/new', data)
    },
    async hasCredentials() {
      try {
        const authCredentials = await getAuthCredentials()
        if (authCredentials !== null) {
          return true
        } else {
          return false
        }
      } catch (e) {
        console.log(e.message)   // saving error
        return false
      }
    },
    async checkCredentials() {
      try {
        const authCredentials = await getAuthCredentials()
        if (authCredentials !== null) {
          const response = await axios.get(API_URL + '/api/v1/auth/validate_token.json', {
            headers: authCredentials,
          })
          if (!response.data.success) {
            await AsyncStorage.removeItem('authCredentials')
          }
          return response.data
        } else {
          return false
        }
      } catch (e) {
        console.log(e.message)   // saving error
        return false
      }
    },
    async signOut() {
      try {
        const authCredentials = await getAuthCredentials()
        if (authCredentials != null) {
          await AsyncStorage.removeItem('authCredentials')
          return await axios.get(API_URL + '/api/v1/auth/sign_out.json', {
            headers: authCredentials,
          })

        }
      } catch (e) {
        console.log(e.message)   // saving error
        return false
      }
    },
  },
  propiedades: {
    async fetchAll(paginationData) {
      const authCredentials = await getAuthCredentials()
      return axios.get(buildPaginationData(API_URL + '/api/v1/propiedades.json', paginationData), {
        headers: authCredentials,
      })
    },
    async fetchById(propertyId) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.get(API_URL + '/api/v1/propiedades/' + propertyId + '.json', {
          headers: authCredentials,
        })
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async updateProperty(propertyId, data) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.put(API_URL + '/api/v1/propiedades/' + propertyId + '.json', {
            propiedad: data,
          }, {
            headers: authCredentials,
          },
        )
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async postProperty(property, contacts) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.post(API_URL + '/api/v1/propiedades.json', {
            propiedad: property,
            contactos: contacts,
          }, {
            headers: authCredentials,
          },
        )
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async sendEmail(mail) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.post(API_URL + '/api/v1/propiedades/send_email.json',
          mail,
          {
            headers: authCredentials,
          },
        )
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async uploadPhotos(propertyId, data) {
      try {
        let formData = new FormData()
        data.forEach((photo) => {
          formData.append('fotos[]', { uri: photo.uri, name: photo.filename, type: 'image/*' })
        })
        const authCredentials = await getAuthCredentials()
        await axios({
          url: API_URL + '/api/v1/propiedades/' + propertyId + '/upload_photos.json',
          method: 'POST',
          data: formData,
          headers: {
            ...authCredentials,
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(function(response) {
            return response
          })
          .catch(function(error) {
            console.log('error from image :', error.message)
            return error
          })
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async orderPhotos(propertyId, arrayId) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.post(API_URL + '/api/v1/propiedades/' + propertyId + '/photos_order.json', {
            order: arrayId,
          }, {
            headers: authCredentials,
          },
        )
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async updatePhoto(photoId, data) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.put(API_URL + '/api/v1/fotos/' + photoId + '.json', {
            foto: data,
          }, {
            headers: authCredentials,
          },
        )
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async deletePhoto(photoId) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.delete(API_URL + '/api/v1/fotos/' + photoId + '.json',
          {
            headers: authCredentials,
          },
        )
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
  },
  ubicaciones: {
    async fetchAll() {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.get(API_URL + '/api/v1/ubicaciones.json', {
          headers: authCredentials,
        })
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
  },
  propietarios: {
    async fetchAll() {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.get(API_URL + '/api/v1/propietarios.json', {
          headers: authCredentials,
        })
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async fetchById(ownerId) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.get(API_URL + '/api/v1/propietarios/' + ownerId + '.json', {
          headers: authCredentials,
        })
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async postOwner(owner) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.post(API_URL + '/api/v1/propietarios.json', {
            propietario: owner,
          }, {
            headers: authCredentials,
          },
        )
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
  },
  edificios: {
    async fetchAll() {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.get(API_URL + '/api/v1/edificios.json', {
          headers: authCredentials,
        })
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async fetchById(edificioId) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.get(API_URL + '/api/v1/edificios/' + edificioId + '.json', {
          headers: authCredentials,
        })
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
  },
  clientes: {
    async fetchAll(paginationData) {
      const authCredentials = await getAuthCredentials()
      return axios.get(buildPaginationData(API_URL + '/api/v1/clientes.json', paginationData), {
        headers: authCredentials,
      })
    },
    async fetchById(clientId) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.get(API_URL + '/api/v1/clientes/' + clientId + '.json', {
          headers: authCredentials,
        })
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async updateClient(clientId, data, locations, properties) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.put(API_URL + '/api/v1/clientes/' + clientId + '.json', {
            cliente: data,
            ubicaciones: locations,
            propiedades: properties,
          }, {
            headers: authCredentials,
          },
        )
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
    async postClient(client, locations) {
      try {
        const authCredentials = await getAuthCredentials()
        return axios.post(API_URL + '/api/v1/clientes.json', {
            cliente: client,
            ubicaciones: locations,
          }, {
            headers: authCredentials,
          },
        )
      } catch (e) {
        console.log(e.message)   // saving error
      }
    },
  },
}