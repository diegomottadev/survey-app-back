/* Controllers */
const express = require('express')
const formController = require('./forms.controller');
const procesarErrores  = require('../../libs/errorHandler').procesarErrores
const formsRouter = express.Router()
const log = require('../utils/logger')


formsRouter.get('/all', procesarErrores((req, res) => {
  const { page = 1, pageSize = 10} = req.query;

  return formController
    .all(page, pageSize, true)
    .then((ages) => {
      res.json({ data: ages });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error al obtener todas las edades' });
    });  
}));


formsRouter.get('/', procesarErrores(async (req, res) => {
    
    const { pet, age, size, necessity } = req.query;
  
    try {
      const form = await formController.find(pet, age, size, necessity);
      
      if (!form) {
        log.error(`No se encontró ningún producto que cumpla con los criterios de búsquedaImagen: [${pet}, ${age}, ${size}, ${necessity}].`)
        return res.status(404).json({ message: 'No se encontró ningún producto que cumpla con los criterios ingresados.' });
      }
      
      res.json({ data: {product: form.answer} });
    } catch (error) {
      console.error(error);
      log.error(`Error no controlado. Devolución del producto en base a los parametros ha fallado: [${pet}, ${age}, ${size}, ${necessity}}].`)
      res.status(500).json({ message: 'Error al buscar el formulario.' });
    }
}));



module.exports = formsRouter;