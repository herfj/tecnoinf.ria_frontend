import {validEmail} from "./formValidator";

const isString = (str) => {
    return (typeof str === 'string' || str instanceof String)
}
const isBoolean = (boo) => {
    return (typeof boo === 'boolean' || boo instanceof Boolean)
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


export const validateSignUpUser = (possibleUser) => {
    let user = {
        Nombre: '',
        Apellido: '',
        Email: '',
        Password: '',
        Pais: '',
        Fecha_nac: '',
        Descripcion: "",
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

    let errorValidated = false

    if (!isString(possibleUser.Nombre)) {
        errorValidated = true
    }
    if (!isString(possibleUser.Apellido)) {
        errorValidated = true
    }
    if (!validEmail(possibleUser.Email)) {
        errorValidated = true
    }
    if (!isString(possibleUser.Password)) {
        errorValidated = true
    }
    if (!isString(possibleUser.Pais)) {
        errorValidated = true
    }
    if (!isString(possibleUser.Fecha_nac)) {
        errorValidated = true
    }

    if (errorValidated) {
        return false
    } else {
        return possibleUser
    }
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