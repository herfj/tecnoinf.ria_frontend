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
            console.log('post',data)
            return axios.post(API_URL + '/api/usuarios/CreateUsuario', data, {
                headers: headers
            })
        },
    },
    users:{
        updateUser(data) {
            console.log('user a mandar', data)
            return axios.put(API_URL + '/api/usuarios/UpdateUsuario', data, {
                headers: headers
            })
        },
        getUser(email){
            console.log('email',email)
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
        likeProject(like){
            return axios.put(API_URL + '/api/usuarios/LikearProyecto',{
                'Email': like.Email,
                'Titulo': like.Titulo,
            },{
                headers: headers,
            })
        },
        dioLike(Email,Titulo){
            return axios.get(API_URL + '/api/usuarios/EsteLeDioLikeONo',{
                headers: headers,
                params: {
                    'Titulo': Titulo,
                    'Email': Email,
                }
            })
        },
        dislikeProject(dislike){
            return axios.put(API_URL + '/api/usuarios/DislikeProyecto',{
                'Email': dislike.Email,
                'Titulo': dislike.Titulo,
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
    },
    projects: {
        fetchAll(){
            return axios.get(API_URL + '/api/proyecto/GetAllProyect', {
                headers: headers,
            })
        },
        createPage(page){
            console.log('pagina', page);
            return axios.post(API_URL + '/api/proyecto/CrearPage', page,{
                headers: headers,
            })
        },
        fetchProject(projectTitle){
            return axios.get(API_URL + '/api/proyecto/GetProyect', {
                headers: headers,
                params: {
                    'titulo': projectTitle
                }
            })
        },
        postProject(project){
            return axios.post(API_URL + '/api/proyecto/CreateProyect', project,{
                headers: headers,
            })
        },
        visto(projectTitle){
            return axios.put(API_URL + '/api/proyecto/SumarProyect', {
                'Titulo': projectTitle,
            },{headers: headers})
        },
        editPage(id,cadenita,textito,title){
            return axios.put(API_URL + '/api/proyecto/EditarPage', {
                'ID': id,
                'cadena': cadenita,
                'texto': textito,
                'Titulo': title
            },{
                headers: headers,
            })
        },
        deletePage(id,title){
            return axios.delete(API_URL + '/api/proyecto/BorrarPage', {
                'ID': id,
                'Titulo': title
            },{
                headers: headers,
            })
        },
        getValorados(email){
            return axios.get(API_URL + '/api/proyecto/FilterByLikes',{
                params: {
                    'Email': email
                },
                headers: headers,
            })
        },
        getMyPJ(email){
            return axios.get(API_URL + '/api/proyecto/FilterByMine',{
                params: {
                    'Email': email
                },
                headers: headers,
            })
        },
        getPJByCat(category){
            return axios.get(API_URL + '/api/proyecto/FilterByCategory', {
                params: {
                    'cat': category
                },
                headers: headers,
            })
        },
        Busqueda(palabraBuscar){
            return axios.get(API_URL +'/api/proyecto/SearchBy',{
                params: {
                    'busqueda': palabraBuscar
                 },
                headers: headers,
            })
        },


    },
    comments: {
        postComment(cmt){
            return axios.post(API_URL + '/api/comentarios/Comment',cmt,{
                headers: headers,
            })
        },
        getComentariosProyect(projectTitle){
            return axios.get(API_URL + '/api/comentarios/GetComentariosFromPJ',{
                headers: headers,
                params: {
                    'Titulo': projectTitle
                }
            })
        },
    }
}