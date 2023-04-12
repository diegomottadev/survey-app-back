class InfoPetInUse extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Existe una mascota con el mismo nombre'
        this.status = 409
        this.name = "InfoPetInUse"
    }
}

class PetNotExist extends Error {
    constructor(message){
        super(message)
        this.message = message || 'La mascota no existe. Operación no puede ser completada'
        this.status = 404
        this.name = "PetNotExist"
    }
}

module.exports = {
    InfoPetInUse,
    PetNotExist
}
