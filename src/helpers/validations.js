const isString = (str) => {
    return (typeof str === 'string' || str instanceof String)
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
