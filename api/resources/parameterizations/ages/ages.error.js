class InfoAgeInUse extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Existe una edad con el mismo nombre'
        this.status = 409
        this.name = "AgeInUse"
    }
}

class AgeNotExist extends Error {
    constructor(message){
        super(message)
        this.message = message || 'La edad no existe. Operación no puede ser completada'
        this.status = 404
        this.name = "AgeNotExist"
    }
}

module.exports = {
    InfoAgeInUse,
    AgeNotExist
}
