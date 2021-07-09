import axiosHttp from 'axios'
import {API_URL} from '../config/api_config'
import {sendMessage} from "../modules/message.module";

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
    },
    users:{
        getUser(email){
            return axios.get(API_URL + '/api/usuarios/GetUsuario', {
                headers: headers,
                params: {
                    'Email': email
                }
            })
        },
        followUser(emailseguidor, emailseguido){
            return axios.put(API_URL + '/api/usuarios/Seguir', {
                'seguidor': emailseguidor,
                'seguido': emailseguido

            },{
                headers: headers,
            })
        },
        unfollowUser(emailseguidor, emailseguido){
            return axios.put(API_URL + '/api/usuarios/DejarDeSeguir', {
                'seguidor': emailseguidor,
                'seguido': emailseguido
            },{
                headers: headers,
            })
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
        getMsg(id){
          return axios.get(API_URL + '/api/mensajes/GetMSG', {
              headers: headers,
              params:{
                  'ID': id
              }
          })
        },
        clavarElVistoo(id){
            return axios.put(API_URL + '/api/mensajes/PonerVisto', {
                'ID': id
            },{
                headers: headers,
            })
        },
        sendMessagee(message){
            return axios.post(API_URL + '/api/mensajes/SendMSG', message,{
                headers: headers
            })
        },
        getSent(email){
            return axios.get(API_URL + '/api/mensajes/BandejadeSalida', {
                headers: headers,
                params: {
                    'Email': email
                }
            })
        },


    }
    
}