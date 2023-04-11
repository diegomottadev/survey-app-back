class InfoUserInUse extends Error {
    constructor(message){
        super(message)
        this.message = message || 'El email o usuario o telefono ya estan asociados con una cuenta'
        this.status = 409
        this.name = "InfoUserInUse"
    }
}

class IncorrectCredentials extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Credenciales incorrectas. Asegure que el username y contraseña sean correctas'
        this.status = 409
        this.name = "IncorrectCredentials"
    }
}

class UserNotExist extends Error {
    constructor(message){
        super(message)
        this.message = message || 'El usuario no existe. Operación no puede ser completada'
        this.status = 404
        this.name = "UserNotExist"
    }
}


module.exports = {
    InfoUserInUse,
    IncorrectCredentials,
    UserNotExist
}
