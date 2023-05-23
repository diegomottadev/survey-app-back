/* Controllers */
const express = require('express')
const formController = require('./forms.controller');
const procesarErrores  = require('../../libs/errorHandler').procesarErrores
const formsRouter = express.Router()
const passport = require('passport')
const jwtAuthenticate = passport.authenticate('jwt', { session: false })
const log = require('../utils/logger')

const xlsx = require('xlsx')
const path = require('path');
const multer = require('multer');
const string = require('@hapi/joi/lib/types/string');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

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
      
      res.json({ data:form} );
      
    } catch (error) {
      console.error(error);
      log.error(`Error no controlado. Devolución del producto en base a los parametros ha fallado: [${pet}, ${age}, ${size}, ${necessity}}].`)
      res.status(500).json({ message: 'Error al buscar el formulario.' });
    }
}));

formsRouter.post('/import',  [jwtAuthenticate], upload.single('file'),procesarErrores((async (req, res) => {
  const file = req.file

  if (!file) {
    res.status(400).json({ message: 'Se requiere un archivo Excel.' })
    return
  }

// Verifica que el archivo no esté vacío
  if (file.size === 0) {
      res.status(400).json({ message: 'El archivo está vacío.' })
      return
  }

  // Verifica la extensión del archivo
  const fileExtension = path.extname(file.originalname)
  if (fileExtension !== '.xls' && fileExtension !== '.xlsx') {
      res.status(400).json({ message: 'El archivo debe tener una extensión .xls o .xlsx.' })
      return
  }
  
  const workbook = xlsx.read(file.buffer, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]


    // Valida que el archivo tenga los encabezados correctos
  const expectedHeaders = ['Mascota', 'Edad', 'Tamaño', 'Necesidad', 'Producto', 'ID Imagen']
  const headers = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0]
  const invalidHeaders = headers.filter(header => !expectedHeaders.includes(header))
  if (invalidHeaders.length > 0) {
      res.status(400).json({ message: `El archivo Excel contiene encabezados inválidos: ${invalidHeaders.join(', ')}` })
      return
  }

  const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 })

  // Elimina la fila de encabezado
  rows.shift()
  // Convierte las filas en objetos de cliente
  const forms = rows.map(row => ({
    pet: row[0],
    age: row[1],
    size: row[2] != ''? row[2]: null,
    necessity: row[3],
    answer: row[4],
    image_name: (row[5]).toString(),
  }))

// Borra todos los clientes existentes en la tabla Clientes
  await formController.allDestroy()

  // Crea los clientes y genera los códigos QR para cada cliente
  const promises = forms.map(async (form) => {

      return formController.create(form)
  })

  // Espera a que se completen todas las promesas
  await Promise.all(promises)

  res.json({ message: 'Importación completada exitosamente.' })
})))




module.exports = formsRouter;