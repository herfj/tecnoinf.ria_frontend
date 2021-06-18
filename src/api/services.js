import axiosHttp from 'axios'
import { API_URL } from '../config/api_config'

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

export default {
  auth: {
    login(data) {
      return axios.post(API_URL + '/api/v1/auth/sign_in', data)
    },
  },
}