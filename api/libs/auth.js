const _ = require('underscore')
const log = require('./../resources/utils/logger')
const bcrypt = require('bcrypt')
const passportJWT = require('passport-jwt')
const config = require('../config')
const userController = require('../resources/users/users.controller')
//modulo de autenticacion con jwt
//ve a buscar el token el headear del request
let jwtOption = {
    secretOrKey: config.jwt.secreto,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}
module.exports = new passportJWT.Strategy(jwtOption,(jwtPayload,next) =>{

    userController.find(jwtPayload.id)
    .then(usuario => {
        if(!usuario){
            log.info(`JWT token no es valido. Usuario con el id ${jwtPayload.id} no existe`)
            next(null,false)
            return 
        }
        log.info(`Usuario ${usuario.name} suministro un token valido. Autenticacion completada`)
        next(null,{
            name: usuario.name,
            id: usuario.id,
        })
    }).catch(err =>{
        log.error("Error ocurrió al tratar de validar el token",err)
        next(err)
    })
})
