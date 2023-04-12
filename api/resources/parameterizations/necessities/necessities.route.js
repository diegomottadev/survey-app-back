/* Controllers */
const express = require('express');
const passport = require('passport');
const log = require('../../utils/logger');
const necessityController = require('./necessities.controller');
const { InfoNecessityInUse, NecessityNotExist } = require('./necessities.error');
const procesarErrores = require('../../../libs/errorHandler').procesarErrores;
const validationNecessity = require('./necessities.validation').validationNecessity;
const jwtAuthenticate = passport.authenticate('jwt', { session: false });
const xlsx = require('xlsx');

const path = require('path');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const necessityRouter = express.Router();

necessityRouter.post('/', [jwtAuthenticate, validationNecessity], procesarErrores(async (req, res) => {
  let newNecessity = req.body;
  const necessityExist = await necessityController.necessityExist(newNecessity.name);
  if (necessityExist) {
    log.warn(`Necesidad [${newNecessity.name}] ya existen.`);
    res.status(409).json({ message: 'Existe una necesidad con el mismo nombre.' });
    throw new InfoNecessityInUse();
  }

  const necessityCreated = await necessityController.create(newNecessity);
  res.status(201).json({
    message: `Necesidad [${necessityCreated.name}] creado exitosamente.`,
    data: necessityCreated,
  });
}));

necessityRouter.get('/', [jwtAuthenticate], procesarErrores((req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  return necessityController
    .all(page, pageSize)
    .then((necessities) => {
      res.json({ data: necessities });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error al obtener todas las necesidades' });
    });
}));

necessityRouter.get('/:id', [jwtAuthenticate], procesarErrores(async (req, res) => {
  const id = req.params.id;

  // Obtener la necesidad por su ID
  const necessity = await necessityController.findById(id);

  if (!necessity) {
    throw new NecessityNotExist(`La necesidad con id [${id}] no existe.`);
  }

  // Escribir la respuesta HTTP con la necesidad
  res.json({ data: necessity });
}));

necessityRouter.put('/:id', [jwtAuthenticate, validationNecessity], procesarErrores(async (req, res) => {
  let id = req.params.id;
  let necessityToUpdate;

  necessityToUpdate = await necessityController.findById(id);

  if (!necessityToUpdate) {
    throw new NecessityNotExist(`La necesidad con id [${id}] no existe.`);
  }

  return necessityController
    .edit(id, req.body)
    .then((necessityUpdated) => {
      res.json({
        message: `La necesidad [${necessityUpdated.name}] ha sido modificado con exito.`,
        data: necessityUpdated,
      });
      log.info(`La necesidad [${necessityUpdated.name}] ha sido modificado con exito.`);
    });
}));


necessityRouter.delete('/:id', [jwtAuthenticate], procesarErrores(async (req, res) => {
    let id = req.params.id;
    let necessityToDelete;
  
    necessityToDelete = await necessityController.findById(id);
  
    if (!necessityToDelete) {
      throw new NecessityNotExist(`La necesidad con id [${id}] no existe.`);
    }
  
    await necessityController.destroy(id, necessityToDelete);
  
    log.info(`La necesidad con id [${id}] fue eliminada.`);
    res.json({ message: `La necesidad [${necessityToDelete.name}] fue eliminada.`, data: necessityToDelete });
  }));
  
  necessityRouter.post('/import', [jwtAuthenticate], upload.single('file'), procesarErrores(async (req, res) => {
    const file = req.file;
  
    if (!file) {
      res.status(400).json({ message: 'Se requiere un archivo Excel.' });
      return;
    }
  
    // Verifica que el archivo no esté vacío
    if (file.size === 0) {
      res.status(400).json({ message: 'El archivo está vacío.' });
      return;
    }
  
    // Verifica la extensión del archivo
    const fileExtension = path.extname(file.originalname);
    if (fileExtension !== '.xls' && fileExtension !== '.xlsx') {
      res.status(400).json({ message: 'El archivo debe tener una extensión .xls o .xlsx.' });
      return;
    }
  
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
  
    // Valida que el archivo tenga los encabezados correctos
    const expectedHeaders = ['Necesidad', 'ID Mascota'];
    const headers = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0];
    const invalidHeaders = headers.filter(header => !expectedHeaders.includes(header));
    if (invalidHeaders.length > 0) {
      res.status(400).json({ message: `El archivo Excel contiene encabezados inválidos: ${invalidHeaders.join(', ')}` });
      return;
    }
  
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
    // Elimina la fila de encabezado
    rows.shift();
  
    // Convierte las filas en objetos de cliente
    const necessities = rows.map(row => ({
      name: row[0],
      pet_id: row[1],
    }));
  
    // Borra todas las necesidades existentes en la tabla Necessities
    await necessityController.allDestroy();
  
    // Crea las necesidades
    const promises = necessities.map(async (necessity) => {
      return necessityController.create(necessity);
    });
  
    // Espera a que se completen todas las promesas
    await Promise.all(promises);
  
    res.json({ message: 'Importación completada exitosamente.' });
  }));
  
  necessityRouter.post('/export', [jwtAuthenticate], procesarErrores(async (req, res) => {
    try {
      // Obtener todas las necesidades sin paginar
      const necessities = await necessityController.all(undefined, undefined, false);
  
      // Crear un libro de trabajo de Excel
      const workbook = xlsx.utils.book_new();
  
      // Crear una hoja de trabajo de Excel para las necesidades
      const worksheet = xlsx.utils.json_to_sheet(necessities, { header: ['name', 'pet_id'] });
  
      // Agregar encabezados a las columnas
      worksheet['A1'] = { v: 'Nombre' };
      worksheet['B1'] = { v: 'ID Mascota' };
  
      // Agregar los datos de las necesidades a la hoja de trabajo
      necessities.forEach((necessity, index) => {
        const rowIndex = index + 2;
        worksheet[`A${rowIndex}`] = { v: necessity.name };
        worksheet[`B${rowIndex}`] = { v: necessity.pet_id };
      });
  
      // Agregar la hoja de trabajo al libro de trabajo
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Necesidades');
  
      // Convertir el libro de trabajo de Excel en un buffer
      const excelBuffer = xlsx.write(workbook, { type: 'buffer' });
  
      // Enviar el archivo Excel al cliente
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.set('Content-Disposition', 'attachment; filename="necesidades.xlsx"');
      res.send(excelBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al exportar las necesidades.' });
    }
  }));


  module.exports = necessityRouter
