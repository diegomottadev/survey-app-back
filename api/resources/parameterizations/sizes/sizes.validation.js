const Joi = require('@hapi/joi')

const log = require('../../utils/logger')

const blueprintSize = Joi.object({
  
    name: Joi.string().required(),
    pet_id: Joi.number().required(),
})

let validationSize = (req, res, next) => {
    const resultado = blueprintSize.validate(req.body, { abortEarly: false, convert: false })
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
    validationSize
}
