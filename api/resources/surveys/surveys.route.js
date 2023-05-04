
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
const xlsx = require('xlsx')
const ExcelJS = require('exceljs');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000'
const IMAGE_API_BASE_URL =`${BASE_URL}/images`;

surveysRouter.get('/', [jwtAuthenticate],procesarErrores((req, res) => {
  const { page = 1, pageSize = 10} = req.query;

  return surveyController
    .all(page, pageSize, true)
    .then((surveys) => {
      res.json({ data: surveys });
    })
    // .catch((err) => {
    //   res.status(500).json({ message: 'Error al obtener todas las encuentas' });
    // });  
}));

surveysRouter.post('/', [validationSurvey], procesarErrores(async (req, res) => {
    
    const { pet, age, size, necessity, answer, client_code, image_name} = req.body;

    const clientExist = await clientController.findByCode(client_code)
    if (!clientExist) {
      log.warn(`Codigo del cliente no existen: ${client_code}`)
      res.status(409).json({message:`No existe un cliente con el id: ${client_code}`})
      throw new InfoClientInUse()
    }


    const survey = await surveyController.create(pet, age, size, necessity, answer,clientExist.id,image_name);

    res.status(201).json({data: survey})

}));

surveysRouter.put('/:id', procesarErrores(async (req, res) => {
    
  let id = req.params.id
  let surveyToUpdate = await surveyController.findById(id)

  if(!surveyToUpdate){
      throw new  AgeNotExist(`La encuesta con id [${id}] no existe.`)
  }
  const {name, telephone,email} = req.body;
  return surveyController.edit(id,name, telephone,email)
  .then(surveyUpdated => {
          res.json({message:`La encuenta con id [${surveyUpdated.id}] ha sido modificado con exito.`,data:surveyUpdated})
          log.info(`La encuenta con id [${surveyUpdated.id}] ha sido modificado con exito.`)
  })

}));


surveysRouter.get('/export', [jwtAuthenticate], procesarErrores(async (req, res) => {
  const {page = 1 ,pageSize = Number.MAX_SAFE_INTEGER ,name} = req.query
  let where = {};
  if (name) {
      where.name = { [Op.like]: `%${name}%` };
  }

  const surveys = await surveyController.all(page, pageSize, true);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Resultados');

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Mascota', key: 'pet', width: 10 },
    { header: 'Edad', key: 'age', width: 30 },
    { header: 'Tamaño', key: 'size', width: 30 },
    { header: 'Necesidad', key: 'necessity', width: 30 },
    { header: 'Producto recomendado', key: 'answer', width: 30 },
    { header: 'Imagen del producto', key: 'image', width: 30 },
    { header: 'Cliente', key: 'name', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Telefono', key: 'telephone', width: 30 },
    { header: 'Cod. Punto de venta', key: 'client_code', width: 30 },
    { header: 'Nombre Punto de venta', key: 'client_name', width: 30 },

  ];

  surveys.forEach((survey) => {
    worksheet.addRow({
      id: survey.id,
      pet: survey.pet,
      age: survey.age,
      size: survey.size,
      necessity: survey.necessity,
      answer: survey.answer,
      image: `${IMAGE_API_BASE_URL}/${survey.image_name}`,
      name: survey.name,
      email: survey.email,
      telephone: survey.telephone,
      client_code: survey.client.code,
      client_name: survey.client.name,
    });
  });

  const filename = 'results.xlsx';
  const filepath = `./${filename}`;
  await workbook.xlsx.writeFile(filepath);

  const filestream = fs.createReadStream(filepath);
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  filestream.pipe(res);

  filestream.on('close', () => {
    fs.unlinkSync(filepath);
  });
}));





module.exports = surveysRouter;