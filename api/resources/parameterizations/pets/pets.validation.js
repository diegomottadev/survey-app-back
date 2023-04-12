const Joi = require('@hapi/joi')

const log = require('../../utils/logger')

const blueprintPet = Joi.object({
  
    name: Joi.string().required(),
})

let validationPet = (req, res, next) => {
    const resultado = blueprintPet.validate(req.body, { abortEarly: false, convert: false })
    if (resultado.error === undefined) {
        next()
    } else {
        let errorDeValidacion = resultado.error.details.map(error => {
            return `[${error.message}]`
        })
        log.warn(`El siguiente usuario no pasó la validación: ${req.body} - ${errorDeValidacion}   `)
        res.status(400).send(`${errorDeValidacion}`)
    }
}

module.exports = {
    validationPet
}
