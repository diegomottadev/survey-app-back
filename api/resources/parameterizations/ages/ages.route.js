/* Controllers */
const express = require('express')
const passport = require('passport')
const log = require('../../utils/logger')
const ageController = require('./ages.controller');
const { InfoAgeInUse , AgeNotExist} = require('./ages.error');
const procesarErrores  = require('../../../libs/errorHandler').procesarErrores
const validationAge = require('./ages.validation').validationAge
const jwtAuthenticate = passport.authenticate('jwt', { session: false })
const xlsx = require('xlsx')

const path = require('path');

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const ageRouter = express.Router()

ageRouter.post('/', [jwtAuthenticate,validationAge], procesarErrores(async (req, res) => {
    let newAge = req.body
    const ageExist = await ageController.ageExist(newAge.name)
    if (ageExist) {
      log.warn(`Edad [${newAge.name}] ya existen.`)
      res.status(409).json({message:'Existe una edad con el mismo nombre.'})
      throw new InfoAgeInUse()
    }
  
    const ageCreated = await ageController.create(newAge)
    res.status(201).json({
      message: `Edad [${ageCreated.name}] creado exitosamente.`,
      data: ageCreated
    })
  }))

ageRouter.get('/', procesarErrores((req, res) => {
  const { page = 1, pageSize = 10, pet_id = null } = req.query;

  return ageController
    .all(page, pageSize, true, pet_id)
    .then((ages) => {
      res.json({ data: ages });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error al obtener todas las edades' });
    });
    
}));

ageRouter.get('/:id',[jwtAuthenticate],procesarErrores(async(req, res) => {

    const id = req.params.id

    // Obtener el cliente por su ID
    const age = await ageController.findById(id)

    if (!age) {
        throw new AgeNotExist(`La edad con id [${id}] no existe.`)
    }

    // Escribir la respuesta HTTP con el agee y su código QR
    res.json({data:age })
}))

ageRouter.put('/:id',[jwtAuthenticate,validationAge], procesarErrores(async (req, res) => {

    let id = req.params.id
    let ageToUpdate
    
    ageToUpdate = await ageController.findByCode(id)

    if(!ageToUpdate){
        throw new  AgeNotExist(`La idad con id [${id}] no existe.`)
    }

    return ageController.edit(id,req.body)
    .then(ageUpdated => {
            res.json({message:`La edad [${ageUpdated.nombre}] ha sido modificado con exito.`,data:ageUpdated})
            log.info(`La edad [${ageUpdated.name}] ha sido modificado con exito.`)
    })
   
}))

ageRouter.delete('/:id', [jwtAuthenticate],procesarErrores((async (req, res) => {

    let id = req.params.id
    let ageDelete

    ageDelete = await ageController.findById(id)
    
    if (!ageDelete) {
        throw new  AgeNotExist(`La edad con id [${id}] no existe.`)
    }

    ageDelete = await ageController.destroy(id,ageDelete)
    log.info(`La edad con id [${id}] fue eliminado.`)
    res.json({message:`La edad [${ageDelete.name}] fue eliminado.`, data:ageDelete})

})))

ageRouter.post('/import',  [jwtAuthenticate], upload.single('file'),procesarErrores((async (req, res) => {
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
    const expectedHeaders = ['Edad','ID Mascota']
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
    const ages = rows.map(row => ({
        name: row[0],
        pet_id: row[1],
    }))
  
  // Borra todos los clientes existentes en la tabla Clientes
    await ageController.allDestroy()

    // Crea los clientes y genera los códigos QR para cada cliente
    const promises = ages.map(async (age) => {
        return ageController.create(age)
    })

    // Espera a que se completen todas las promesas
    await Promise.all(promises)
  
    res.json({ message: 'Importación completada exitosamente.' })
})))


ageRouter.post('/export', [jwtAuthenticate],procesarErrores((async (req, res) => {
    try {
        // Obtener todos los clientes sin paginar
        const ages = await ageController.all(undefined, undefined, false)
    
        // Crear un libro de trabajo de Excel
        const workbook = xlsx.utils.book_new();
    
        // Crear una hoja de trabajo de Excel para los clientes
        const worksheet = xlsx.utils.json_to_sheet(ages, { header: ['name', 'pet_id'] });
    
        // Agregar encabezados a las columnas
        worksheet['A1'] = { v: 'Edad' };
        worksheet['B1'] = { v: 'ID Mascota' };
    
        // Agregar los datos de los clientes a la hoja de trabajo
        ages.forEach((age, index) => {
          const rowIndex = index + 2;
          worksheet[`A${rowIndex}`] = { v: age.name };
          worksheet[`B${rowIndex}`] = { v: age.pet_id };
        
        });
    
        // Agregar la hoja de trabajo al libro de trabajo
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Edades');
    
        // Convertir el libro de trabajo de Excel en un buffer
        const excelBuffer = xlsx.write(workbook, { type: 'buffer' });
    
        // Enviar el archivo Excel al cliente
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('Content-Disposition', 'attachment; filename="edades.xlsx"');
        res.send(excelBuffer);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al exportar las edades.' });
      }
    })))


module.exports = ageRouter
