const Joi = require('@hapi/joi')

const log = require('../../utils/logger')

const blueprintNecessity = Joi.object({
  
    name: Joi.string().required(),
    pet_id: Joi.number().required(),
})

let validationNecessity = (req, res, next) => {
    const resultado = blueprintNecessity.validate(req.body, { abortEarly: false, convert: false })
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
    validationNecessity
}
