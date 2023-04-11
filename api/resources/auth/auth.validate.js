const Joi = require('@hapi/joi')

const log = require('../utils/logger')


const blueprintLogin = Joi.object({
    password : Joi.string().min(5).max(200).required(),
    email : Joi.string().email().required()
})


let validLogin = (req,res,next)=>{
    let result = blueprintLogin.validate(req.body,{abortEarly:false,convert: false})
    if(result.error === undefined){
        next();//ve a la sgt funcion de la cadena y no es return
    }
    else{
        let errorDeValidacion = result.error.details.map(error=>{
            return `[${error.message}]`
        })
        log.warn('Los datos del usuario no paso la validacion: ',req.body,errorDeValidacion)
        res.status(400).send(errorDeValidacion  )
    }
}

module.exports = {
    validLogin
}
