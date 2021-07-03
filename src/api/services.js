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

  }
  return path
}

export default {
  auth: {
    login(data) {
      return axios.get(API_URL + '/users/'+data.email, data)
    },
    signUp(data) {
        console.log('coso a mandar', data)
      return axios.post(API_URL + '/api/usuarios/CreateUsuario', data,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    sign_out(data) {
      return axios.post(API_URL + '/api/v1/auth/sign_out', data)
    },
  },
}