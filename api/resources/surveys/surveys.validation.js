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
    answer: Joi.string().required(),
    necessity: Joi.string().required(),
    client_code: Joi.string().required(),
    image_name:Joi.number().required()
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
