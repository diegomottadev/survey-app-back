/* Controllers */
const express = require('express')
const passport = require('passport')
const log = require('../../utils/logger')
const petController = require('./pets.controller');
const { PetNotFoundError , InvalidPetDataError } = require('./pets.error');
const procesarErrores  = require('../../../libs/errorHandler').procesarErrores
const validationPet = require('./pets.validation').validationPet
const jwtAuthenticate = passport.authenticate('jwt', { session: false })
const xlsx = require('xlsx')

const path = require('path');

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const petRouter = express.Router()
petRouter.post('/', [jwtAuthenticate,validationPet], procesarErrores(async (req, res) => {
    let newPet = req.body
    const petExist = await petController.petExist(newPet.name)
    if (petExist) {
      log.warn(`Mascota [${newPet.name}] ya existen.`)
      res.status(409).json({message:'Existe una mascota con el mismo nombre.'})
      throw new InvalidPetDataError()
    }
  
    const petCreated = await petController.create(newPet)
    res.status(201).json({
      message: `Mascota [${petCreated.name}] creada exitosamente.`,
      data: petCreated
    })
  }))

petRouter.get("/",[jwtAuthenticate], procesarErrores((req, res) => {
    const { page = 1, pageSize = 10 } = req.query;

    return petController.all(page,pageSize).then(pets =>{
        res.json({data:pets})
    }).catch(err =>{
        res.status(500).json({message:'Error al obtener todas las mascotas'})
    })
}))

petRouter.get('/:id',[jwtAuthenticate],procesarErrores(async(req, res) => {

    const id = req.params.id

    // Obtener la mascota por su ID
    const pet = await petController.findById(id)

    if (!pet) {
        throw new PetNotFoundError(`La mascota con id [${id}] no existe.`)
    }

    // Escribir la respuesta HTTP con la mascota
    res.json({data:pet })
}))

petRouter.put('/:id',[jwtAuthenticate,validationPet], procesarErrores(async (req, res) => {

    let id = req.params.id
    let petToUpdate
    
    petToUpdate = await petController.findById(id)

    if(!petToUpdate){
        throw new  PetNotFoundError(`La mascota con id [${id}] no existe.`)
    }

    return petController.edit(id,req.body)
    .then(petUpdated => {
            res.json({message:`La mascota [${petUpdated.name}] ha sido modificada con exito.`,data:petUpdated})
            log.info(`La mascota [${petUpdated.name}] ha sido modificada con exito.`)
    })
   
}))

petRouter.delete('/:id', [jwtAuthenticate], procesarErrores(async (req, res) => {
    const id = req.params.id;
  
    const pet = await Pet.findById(id);
  
    if (!pet) {
      throw new PetNotExist(`No existe la mascota con id ${id}.`);
    }
  
    await Pet.destroy(id);
  
    log.info(`Mascota con id ${id} eliminada.`);
    res.json({ message: `La mascota con id ${id} fue eliminada.` });
  }));

  petRouter.post('/import',  [jwtAuthenticate], upload.single('file'),procesarErrores((async (req, res) => {
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
    const expectedHeaders = ['Mascota']
    const headers = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0]
    const invalidHeaders = headers.filter(header => !expectedHeaders.includes(header))
    if (invalidHeaders.length > 0) {
        res.status(400).json({ message: `El archivo Excel contiene encabezados inválidos: ${invalidHeaders.join(', ')}` })
        return
    }
  
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
  
    // Elimina la fila de encabezado
    rows.shift()
  
    // Convierte las filas en objetos de mascota
    const pets = rows.map(row => ({
        name: row[0],
    }))
  
  // Borra todas las mascotas existentes en la tabla Mascotas
    await petController.allDestroy()

    // Crea las mascotas y las guarda en la base de datos
    const promises = pets.map(async (pet) => {
        return petController.create(pet)
    })

    // Espera a que se completen todas las promesas
    await Promise.all(promises)
  
    res.json({ message: 'Importación completada exitosamente.' })
})))

petRouter.post('/export', [jwtAuthenticate], procesarErrores(async (req, res) => {
    try {
        // Obtener todas las mascotas sin paginar
        const pets = await petController.all(undefined, undefined, false);
        
        // Crear un libro de trabajo de Excel
        const workbook = xlsx.utils.book_new();
  
        const worksheet = xlsx.utils.json_to_sheet(pets, { header: ['name'] });
      
        // Agregar encabezados a las columnas
        worksheet['A1'] = { v: 'Mascota' };
    
        // Agregar los datos de las mascotas a la hoja de trabajo
        pets.forEach((pet, index) => {
            const rowIndex = index + 2;
            worksheet[`A${rowIndex}`] = { v: pet.name };
        });
    
        // Agregar la hoja de trabajo al libro de trabajo
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Mascotas');
    
        // Convertir el libro de trabajo de Excel en un buffer
        const excelBuffer = xlsx.write(workbook, { type: 'buffer' });
    
        // Enviar el archivo Excel al cliente
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('Content-Disposition', 'attachment; filename="mascotas.xlsx"');
        res.send(excelBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al exportar las mascotas.' });
    }
}))
module.exports = petRouter
