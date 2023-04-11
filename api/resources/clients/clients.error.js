class InfoClientInUse extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Existe un cliente con el mismo nombre'
        this.status = 409
        this.name = "ClientInUse"
    }
}

class ClientNotExist extends Error {
    constructor(message){
        super(message)
        this.message = message || 'El cliente no existe. Operación no puede ser completada'
        this.status = 404
        this.name = "ClientNotExist"
    }
}

module.exports = {
    InfoClientInUse,
    ClientNotExist
}
