const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authRouter = express.Router()

const config = require('../../config')
const userController = require('./../users/users.controller');
const validLogin = require('./auth.validate').validLogin
const procesarErrores  = require('../../libs/errorHandler').procesarErrores
const log = require('./../utils/logger')
const {IncorrectCredentials} = require('./auth.error')

function convertBodyALowerCase(req,res,next){
    req.body.email && (req.body.email = req.body.email.toLowerCase())
    next()
}

authRouter.post('/login', [validLogin,convertBodyALowerCase],procesarErrores(async (req,res)=> {
    let userUnauthenticate = req.body

    let userExisting

    userExisting = await userController.findByEmail(userUnauthenticate.email)
   

    if(!userExisting){
        log.error(`Usuario[ ${userUnauthenticate.email}] no existe. No pudo ser autenticado`)
        throw new IncorrectCredentials() 
    }

    let passwordIsCorrect
    
    passwordIsCorrect = await bcrypt.compare(userUnauthenticate.password, userExisting.password)
    if (passwordIsCorrect){
        let token = jwt.sign({id: userExisting.id}, config.jwt.secreto,{expiresIn:"24h"})
        log.info(`Usuario ${userUnauthenticate.name} completo autenticacion exitosamente`)
        res.status(200).json({token});
    }else{
        log.info(`Usuario ${userUnauthenticate.name} no completo autenticación. Contraseña incorrecta`)
        throw new IncorrectCredentials() 
    }

}))

module.exports = authRouter
