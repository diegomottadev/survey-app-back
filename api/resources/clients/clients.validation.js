const Joi = require('@hapi/joi')

const log = require('../utils/logger')

const blueprintClient = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().required(),
})

let validationClient = (req, res, next) => {
    const resultado = blueprintClient.validate(req.body, { abortEarly: false, convert: false })
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
    validationClient
}
