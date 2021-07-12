import {validEmail} from "./formValidator";
import {catgoriesOptions} from "./consts";

const isString = (str) => {
    return (typeof str === 'string' || str instanceof String)
}
const isBoolean = (boo) => {
    return (typeof boo === 'boolean' || boo instanceof Boolean)
}

export const validateLogin = (email, pass) => {
    let loginData = {
        Email: '',
        Password: '',
    };
    let errorValidated = false

    if (validEmail(email)) {
        loginData.Email = email;
    } else {
        errorValidated = true
    }
    if (isString(pass)) {
        loginData.Password = pass;
    } else {
        errorValidated = true
    }
    if (errorValidated) {
        return false
    } else {
        return loginData
    }
}
export const validateSignUpUser = (possibleUser) => {
    let user = {
        Nombre: '',
        Apellido: '',
        Email: '',
        Password: '',
        Pais: '',
        Fecha_nac: '',
    };
    let errorValidated = false

    if (isString(possibleUser.Nombre)) {
        user.Nombre = possibleUser.Nombre
    } else {
        errorValidated = true
    }
    if (isString(possibleUser.Apellido)) {
        user.Apellido = possibleUser.Apellido
    } else {
        errorValidated = true
    }
    if (validEmail(possibleUser.Email)) {
        user.Email = possibleUser.Email
    } else {
        errorValidated = true
    }
    if (isString(possibleUser.Password)) {
        user.Password = possibleUser.Password
    } else {
        errorValidated = true
    }
    if (isString(possibleUser.Pais)) {
        user.Pais = possibleUser.Pais
    } else {
        errorValidated = true
    }
    if (isString(possibleUser.Fecha_nac)) {
        user.Fecha_nac = possibleUser.Fecha_nac
    } else {
        errorValidated = true
    }

    if (errorValidated) {
        return false
    } else {
        return user
    }
}
export const validateForUpdateUser = (possibleUser) => {
    let possibleU = validateSignUpUser(possibleUser)
    if (possibleU) {
        const user = {
            ...possibleU,
            Profesion: possibleUser.Profesion ? possibleUser.Profesion : '',
            Empresa: possibleUser.Empresa ? possibleUser.Empresa : '',
            Pais: possibleUser.Pais ? possibleUser.Pais : '',
            Descripcion: possibleUser.Descripcion ? possibleUser.Descripcion : '',
            Ciudad: possibleUser.Ciudad ? possibleUser.Ciudad : '',
            URL: possibleUser.URL ? possibleUser.URL : '',
            imagen: possibleUser.imagen ? possibleUser.imagen : '',
        }
        return user;
    } else {
        return false
    }
}

export const validateMess = (message) => {
    let msg = {
        Fecha: Date.now(),
        Cuerpo: '',
        Visto: 0,
        Emisor: '',
        Remitente: '',
    }
    let errorValidated = false;
    if (isString(message.Cuerpo)) {
        msg.Cuerpo = message.Cuerpo;
    } else {
        errorValidated = true;
    }
    if (message.Emisor != null && validEmail(message.Emisor)) {
        msg.Emisor = message.Emisor;
    } else {
        console.log('Emisor')
    }
    if (message.Remitente != null && validEmail(message.Remitente)) {
        msg.Remitente = message.Remitente;
    } else {
        errorValidated = true;
    }
    if (errorValidated) {
        return false;
    } else {
        return msg;
    }
}
export const validatePage = (possiblePage) =>{
    if(possiblePage.text !== null)
    {

        const page = {
            Texto: possiblePage.image,
            ID_Portfolio: possiblePage.ID_Portfolio,
            Titulo:possiblePage.Titulo,
        }
        return page
    }
    if(possiblePage.image !== null)
    {

        const page = {
            Imagen:possiblePage.image,
            ID_Portfolio: possiblePage.ID_Portfolio,
            Titulo:possiblePage.Titulo,
        }
        return page
    }
   return false;
}
export const validateCreateProject = (possibleProject) => {
    const project = {
        Titulo: '',
        P: '',
        Vistas: 0,
        Autor: '',
        Fecha_publicada: new Date().toISOString(),
        Herramientas: [],
        Proyecto_categorias: [],
        Etiquetas: [],
    }
    let errorValidated = false;
    const categorias = [
        {disenio_grafico: possibleProject.disenio_grafico ? true : false},
        {fotografia: possibleProject.fotografia ? true : false},
        {literatura: possibleProject.literatura ? true : false},
        {plastica: possibleProject.plastica ? true : false},
        {sonido: possibleProject.sonido ? true : false},
        {escultura: possibleProject.escultura ? true : false},
        {disenio: possibleProject.disenio ? true : false},
        {tres_d: possibleProject.tres_d ? true : false},
        {arquitectura: possibleProject.arquitectura ? true : false},
    ]
    project.Proyecto_categorias = categorias.filter((cat, index) => {
        const key = Object.keys(cat)
        if (categorias[index][key]) {
            return {Categoria: key}
        }
    })
    project.Proyecto_categorias=project.Proyecto_categorias.map((o)=>{return {Categoria: Object.keys(o)[0]}})

    if (isString(possibleProject.Etiquetas)) {
        const tags = possibleProject.Etiquetas.split(";");

        project.Etiquetas = tags.map((tag) => {
            return {Etiquetas1: tag.trim()}
        })

    }
    if (isString(possibleProject.Herramientas)) {
        const herr = possibleProject.Herramientas.split(";");
        project.Herramientas = herr.map((tag) => {
            return {Herramienta: tag.trim()}
        })
    }
    if (isString(possibleProject.Titulo)) {
        project.Titulo = possibleProject.Titulo;
    } else {
        errorValidated = true;
    }
    if (isString(possibleProject.P)) {
        project.P = possibleProject.P;
    } else {
        errorValidated = true;
    }
    if (isString(possibleProject.Autor)) {
        project.Autor = possibleProject.Autor;
    } else {
        errorValidated = true;
    }
    if (errorValidated) {
        return false;
    } else {
        return project;
    }

}
