const Joi = require('@hapi/joi')

const log = require('../utils/logger')

const blueprintSurvey  = Joi.object({
    pet: Joi.string().required(),
    age: Joi.string().required(),
    size: Joi.when('pet', {
        is: 'Perro',
        then: Joi.string().required(),
        otherwise: Joi.allow(null)

    }),
    necessity: Joi.string().required(),
    name: Joi.any(),
    telephone: Joi.any(),
    answer: Joi.string().required(),
    client_id: Joi.number().required()
})

let validationSurvey = (req, res, next) => {
    const resultado = blueprintSurvey.validate(req.body, { abortEarly: false, convert: false })
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
    validationSurvey
}
