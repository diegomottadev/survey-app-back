class InfoImageInUse extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Existe una image con el mismo nombre'
        this.status = 409
        this.name = "AgeInUse"
    }
}

class ImageNotExist extends Error {
    constructor(message){
        super(message)
        this.message = message || 'La image no existe. Operación no puede ser completada'
        this.status = 404
        this.name = "ImageNotExist"
    }
}

module.exports = {
    InfoImageInUse,
    ImageNotExist
}
