const isString = (str) => {
    return (typeof str === 'string' || str instanceof String)
}
const isBoolean = (boo) => {
    return (typeof boo === 'boolean' || boo instanceof Boolean)
}

export const validateMess = (message) =>{
    let msg = {
        Fecha: Date.now(),
        Cuerpo:'',
        Visto:'',
        Emisor:'',
        Remitente:'',
    }
    let errorValidated =false;
    if(isString(message.Cuerpo)){
        msg.Cuerpo = message.Cuerpo;
    }else{
       errorValidated = true;
    }
    if(isBoolean(message.Visto)){
        msg.Visto = message.Visto;
    }else{
        errorValidated = true;
    }
    if(message.Emisor != null &&  validateSignUpUser(message.Emisor)===message.Emisor){
        msg.Emisor = message.Emisor;
    }else{
        errorValidated = true;
    }
    if( message.Remitente != null && validateSignUpUser(message.Remitente)===message.Remitente){
        msg.Remitente = message.Remitente;
    }else{
        errorValidated = true;
    }
    if(errorValidated){
        return false;
    }else{
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
    if (isString(possibleUser.Email)) {
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

    if(errorValidated){
        return false
    }else{
        return user
    }
}

export const validateLogin = (email, pass)=>{
    let loginData = {
        Email: '',
        Password: '',
    };
    let errorValidated = false

    if (isString(email)) {
        loginData.Email = email;
    } else {
        errorValidated = true
    }
    if (isString(pass)) {
        loginData.Password = pass;
    } else {
        errorValidated = true
    }
    if(errorValidated){
        return false
    }else{
        return loginData
    }
}