class InfoNecessityInUse extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Existe una necesidad con el mismo nombre'
        this.status = 409
        this.name = "InfoNecessityInUse"
    }
}

class NecessityNotExist extends Error {
    constructor(message){
        super(message)
        this.message = message || 'La necesidad no existe. Operación no puede ser completada'
        this.status = 404
        this.name = "NecessityNotExist"
    }
}

module.exports = {
    InfoNecessityInUse,
    NecessityNotExist
}
