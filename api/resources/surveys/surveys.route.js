
/* Controllers */
const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const log = require('./../utils/logger')
const surveyController = require('./surveys.controller');
const clientController = require('./../clients/clients.controller');

const procesarErrores  = require('../../libs/errorHandler').procesarErrores
const validationSurvey = require('./surveys.validation').validationSurvey
const jwtAuthenticate = passport.authenticate('jwt', { session: false })
const surveysRouter = express.Router()

surveysRouter.get('/', [jwtAuthenticate],procesarErrores((req, res) => {
  const { page = 1, pageSize = 10} = req.query;

  return surveyController
    .all(page, pageSize, true)
    .then((surveys) => {
      res.json({ data: surveys });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error al obtener todas las encuentas' });
    });  
}));

surveysRouter.post('/', [validationSurvey], procesarErrores(async (req, res) => {
    
    const { pet, age, size, necessity, answer,name, telephone, client_code} = req.body;

    const clientExist = await clientController.clienteExist(client_code)
    if (!clientExist) {
      log.warn(`Codigo del cliente no existen: ${client_code}`)
      res.status(409).json({message:`No existe un cliente con el codigo: ${client_code}`})
      throw new InfoClientInUse()
    }


    const survey = await surveyController.create(pet, age, size, necessity, answer,name, telephone,client_code);

    res.status(201).json({data: survey})

}));



module.exports = surveysRouter;