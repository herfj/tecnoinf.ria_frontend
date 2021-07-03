export const responseErrors = (err) => {
    switch (err.response.status) {
        case 401:
            return '¡Los datos ingresados no son correctos!\n' + '(' + err.message + ')'
        case 404:
            return '¡Los datos ingresados no son correctos!\n' + '(' + err.message + ')'
        case 405:
            return '¡Los datos ingresados no son correctos!\n' + '(' + err.message + ')'
            break
        case 500:
            return '¡No se ha podido procesar su solicitud!\n' + '(' + err.message + ')'
            break
        default:
            return 'ERROR DESCONOCIDO:\n' + err.message
    }
}
