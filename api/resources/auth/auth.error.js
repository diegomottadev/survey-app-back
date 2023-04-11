class IncorrectCredentials extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Credenciales incorrectas. Asegure que el email y contraseña sean correctas'
        this.status = 409
        this.name = "IncorrectCredentials"
    }
}

module.exports = {
    IncorrectCredentials,
}
