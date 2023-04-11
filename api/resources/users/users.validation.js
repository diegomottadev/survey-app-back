const Joi = require('@hapi/joi')

const log = require('../utils/logger')

const blueprintUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(100).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
})

let validationUser = (req, res, next) => {
    const resultado = blueprintUser.validate(req.body, { abortEarly: false, convert: false })
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
    validationUser
}
