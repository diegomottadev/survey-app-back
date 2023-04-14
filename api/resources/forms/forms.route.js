/* Controllers */
const express = require('express')
const formController = require('./forms.controller');
const procesarErrores  = require('../../libs/errorHandler').procesarErrores
const formsRouter = express.Router()


formsRouter.get('/', procesarErrores(async (req, res) => {
    
    const { pet, age, size, necessity } = req.query;
  
    try {
      const form = await formController.find(pet, age, size, necessity);
      
      if (!form) {
        return res.status(404).json({ message: 'No se encontró ningún producto que cumpla con los criterios de búsqueda.' });
      }
      
      res.json({ data: {product: form.answer} });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al buscar el formulario.' });
    }
}));

module.exports = formsRouter;