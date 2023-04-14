
/* Controllers */
const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const log = require('./../utils/logger')
const surveyController = require('./surveys.controller');
const procesarErrores  = require('../../libs/errorHandler').procesarErrores
const validationSurvey = require('./surveys.validation').validationSurvey
const surveysRouter = express.Router()

/* TODO codigo de cliente que se recibe como parametro*/
surveysRouter.post('/', [validationSurvey], procesarErrores(async (req, res) => {
    
    const { pet, age, size, necessity, name, telephone, code} = req.body;

    const survey = await surveyController.create(pet, age, size, necessity, name, telephone,code);

    res.status(201).json({data: survey})

}));

module.exports = surveysRouter;