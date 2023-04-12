/* Controllers */
const express = require('express')
const passport = require('passport')
const log = require('../../utils/logger')
const sizeController = require('./sizes.controller');
const { InfoSizeInUse , SizeNotExist} = require('./sizes.error');
const procesarErrores  = require('../../../libs/errorHandler').procesarErrores
const validationSize = require('./sizes.validation').validationSize
const jwtAuthenticate = passport.authenticate('jwt', { session: false })
const xlsx = require('xlsx')

const path = require('path');

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const sizeRouter = express.Router()

sizeRouter.post('/', [jwtAuthenticate,validationSize], procesarErrores(async (req, res) => {
    let newSize = req.body
    const sizeExist = await sizeController.sizeExist(newSize.name)
    if (sizeExist) {
      log.warn(`Tamaño [${newSize.name}] ya existen.`)
      res.status(409).json({message:'Existe un tamaño con el mismo nombre.'})
      throw new InfoSizeInUse()
    }
  
    const sizeCreated = await sizeController.create(newSize)
    res.status(201).json({
      message: `Tamaño [${sizeCreated.name}] creado exitosamente.`,
      data: sizeCreated
    })
  }))

sizeRouter.get("/",[jwtAuthenticate], procesarErrores((req, res) => {
    const { page = 1, pageSize = 10 } = req.query;

    return sizeController.all(page,pageSize).then(sizes =>{
        res.json({data:sizes})
    }).catch(err =>{
        res.status(500).json({message:'Error al obtener todos los tamaños'})
    })
}))

sizeRouter.get('/:id',[jwtAuthenticate],procesarErrores(async(req, res) => {

    const id = req.params.id

    // Obtener el tamaño por su ID
    const size = await sizeController.findById(id)

    if (!size) {
        throw new SizeNotExist(`El tamaño con id [${id}] no existe.`)
    }

    // Escribir la respuesta HTTP con el tamaño y su código QR
    res.json({data:size })
}))

sizeRouter.put('/:id',[jwtAuthenticate,validationSize], procesarErrores(async (req, res) => {

    let id = req.params.id
    let sizeToUpdate
    
    sizeToUpdate = await sizeController.findById(id)

    if(!sizeToUpdate){
        throw new  SizeNotExist(`El tamaño con id [${id}] no existe.`)
    }

    return sizeController.edit(id,req.body)
    .then(sizeUpdated => {
            res.json({message:`El tamaño [${sizeUpdated.name}] ha sido modificado con exito.`,data:sizeUpdated})
            log.info(`El tamaño [${sizeUpdated.name}] ha sido modificado con exito.`)
    })
   
}))

sizeRouter.delete('/:id', [jwtAuthenticate],procesarErrores((async (req, res) => {

    let id = req.params.id
    let sizeDelete

    sizeDelete = await sizeController.findById(id)
    
    if (!sizeDelete) {
        throw new  SizeNotExist(`El tamaño con id [${id}] no existe.`)
    }

    sizeDelete = await sizeController.destroy(id,sizeDelete)
    log.info(`El tamaño con id [${id}] fue eliminado.`)
    res.json({message:`El tamaño [${sizeDelete.name}] fue eliminado.`, data:sizeDelete})

})))


sizeRouter.post('/import',  [jwtAuthenticate], upload.single('file'),procesarErrores((async (req, res) => {
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
    const expectedHeaders = ['Tamaño','ID Mascota']
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
    const sizes = rows.map(row => ({
        name: row[0],
        pet_id: row[1],
    }))
  
  // Borra todos los tamaños existentes en la tabla Tamaños
    await sizeController.allDestroy()

    // Crea los tamaños y los guarda en la base de datos
    const promises = sizes.map(async (size) => {
        return sizeController.create(size)
    })

    // Espera a que se completen todas las promesas
    await Promise.all(promises)
  
    res.json({ message: 'Importación completada exitosamente.' })
})))

sizeRouter.post('/export', [jwtAuthenticate], procesarErrores(async (req, res) => {
    try {
      // Obtener todos los tamaños sin paginar
      const sizes = await sizeController.all(undefined, undefined, false)
      
      // Crear un libro de trabajo de Excel
      const workbook = xlsx.utils.book_new();
  
      const worksheet = xlsx.utils.json_to_sheet(sizes, { header: ['name', 'pet_id'] });
    
      // Agregar encabezados a las columnas
      worksheet['A1'] = { v: 'Tamaño' };
      worksheet['B1'] = { v: 'ID Mascota' };
  
      // Agregar los datos de los clientes a la hoja de trabajo
      sizes.forEach((size, index) => {
        const rowIndex = index + 2;
        worksheet[`A${rowIndex}`] = { v: size.name };
        worksheet[`B${rowIndex}`] = { v: size.pet_id };
      
      });
  
      // Agregar los datos de los tamaños a la hoja de trabajo
      sizes.forEach((size, index) => {
        const rowIndex = index + 2;
        worksheet[`A${rowIndex}`] = { v: size.name };
        worksheet[`B${rowIndex}`] = { v: size.pet_id };
      });
  
      // Agregar la hoja de trabajo al libro de trabajo
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Tamaños');
  
      // Convertir el libro de trabajo de Excel en un buffer
      const excelBuffer = xlsx.write(workbook, { type: 'buffer' });
  
      // Enviar el archivo Excel al cliente
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.set('Content-Disposition', 'attachment; filename="tamanos.xlsx"');
      res.send(excelBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al exportar los tamaños.' });
    }
  }))
  module.exports = sizeRouter
