class InfoSizeInUse extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Existe un tamaño con el mismo nombre'
        this.status = 409
        this.name = "InfoSizeInUse"
    }
}

class SizeNotExist extends Error {
    constructor(message){
        super(message)
        this.message = message || 'El tamaño no existe. Operación no puede ser completada'
        this.status = 404
        this.name = "SizeNotExist"
    }
}

module.exports = {
    InfoSizeInUse,
    SizeNotExist
}
