/* Controllers */
const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const log = require('./../utils/logger')
const userController = require('./users.controller');
const { InfoUserInUse, UserNotExist } = require('./users.error');
const procesarErrores  = require('../../libs/errorHandler').procesarErrores
const validationUser = require('./users.validation').validationUser

const jwtAuthenticate = passport.authenticate('jwt', { session: false })

const usersRouter = express.Router()

usersRouter.post('/', [validationUser], procesarErrores((req,res)=>{
    
    let newUser = req.body
    return userController.userExist(newUser)
    .then(userExist =>{
        if(userExist){
            log.warn(`Email [${newUser.email}] o nombre [${newUser.name}] ya existen.`)
            res.status(409).json({message:'El email o usuario o telefono ya estan asociados con una cuenta.'})
            throw new InfoUserInUse()
        }
        return bcrypt.hash(newUser.password, 10).then((hash) => {
            return userController.create(newUser,hash)
            .then(userCreated =>{
                res.status(201).json({message:`Usuario con nombre [${userCreated.user.name}] creado exitosamente.`,data:userCreated.user})
            })  
        })
    })
}))

usersRouter.get("/",[jwtAuthenticate], procesarErrores((req, res) => {
    return userController.all().then(users =>{
        res.json({data:users})
    }).catch(err =>{
        res.status(500).json({message:'Error al obtener todos usuarios'})
    })
}))


usersRouter.get('/:id',procesarErrores((req, res) => {

    let id = req.params.id
    return userController.find(id).then(user =>{
        if(!user){
            throw new  UserNotExist(`Usuario con id [${id}] no existe.`)
        }
        res.json(user)
    }).catch(err =>{
        res.status(500).json({message:'Error al obtener el usuario.'})
    })
}))

usersRouter.put('/:id', procesarErrores(async (req, res) => {

    let id = req.params.id
    let userToUpdate
    
    userToUpdate = await userController.find(id)

    if(!userToUpdate){
        throw new  UserNotExist(`El usuario con id [${id}] no existe.`)
    }

    return userController.edit(id,req.body)
    .then(userUpdated => {
            res.json({message:`El usuario con nombre [${userUpdated.name}] ha sido modificado con exito.`,data:userUpdated})
            log.info(`El usuario con id [${userUpdated.id}] ha sido modificado con exito.`)
    })
   
}))

usersRouter.delete('/:id', procesarErrores((async (req, res) => {

    let id = req.params.id
    let userToDelete

    userToDelete = await userController.find(id)
    
    if (!userToDelete) {
        throw new  UserNotExist(`El usuario con id [${id}] no existe.`)
    }

    userToDelete = await userController.destroy(id,userToDelete)
    log.info(`Usuario con id [${id}] fue eliminado.`)
    res.json({message:`Usuario con nombre [${userToDelete.name}] fue eliminado.`, data:userToDelete});

})))

module.exports = usersRouter
