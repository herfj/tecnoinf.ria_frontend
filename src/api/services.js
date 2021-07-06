import axiosHttp from 'axios'
import {API_URL} from '../config/api_config'

const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
}

const axios = axiosHttp.create({timeout: 30000})

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
            return axios.post(API_URL + '/api/usuarios/Log', data, {
                headers: headers
            })
        },
        signUp(data) {
            console.log('coso a mandar', data)
            return axios.post(API_URL + '/api/usuarios/CreateUsuario', data, {
                headers: headers
            })
        },
        sign_out(data) {
            return axios.post(API_URL + '/api/v1/auth/sign_out', data)
        },
    },
    messages: {
        getInbox(email) {
            return axios.get(API_URL + '/api/mensajes/BandejadeEntrada', {
                headers: headers,
                params: {
                    'Email': email
                }
            })
        },

    }
}