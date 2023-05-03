const express = require('express');
const fs = require('fs');
const path = require('path');

const procesarErrores = require('../../libs/errorHandler').procesarErrores
const multer = require('multer');
const imageController = require('./images.controller');
const passport = require('passport')
const jwtAuthenticate = passport.authenticate('jwt', { session: false })
const { InfoImageInUse, ImageNotExist } = require('./images.error');
const log = require('../utils/logger');
const { Op } = require('sequelize');


const imagesRouter = express.Router();
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}
// Endpoint de carga de imágenes
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop();
    const date = new Date().toISOString();
    const random = Math.floor(Math.random() * 1000000);
    const filename = `${file.fieldname}-${date.replace(/[:.]/g, "-")}-${random}.${extension}`;
    
    //const filename = `${file.originalname}`;
    // const filename = `${file.originalname}-${Date.now()}`;

    cb(null, filename);
  },
});

const Upload = multer({ storage: Storage });


imagesRouter.post('/', [jwtAuthenticate], Upload.array('images'), procesarErrores(async (req, res) => {
  // return res.status(201).json({message: "La importación de las imagenes a sido exitosa"}); 
  const imagenes = req.files;

  if (Array.isArray(imagenes) && imagenes.length > 10) {
    return res.status(400).json({ message: 'No se pueden cargar más de 10 imágenes.' });
  }

  const imagenesCreadas = [];

  for (const image of imagenes) {

    const imageExist = await imageController.imageExist(image.originalname);
    if (imageExist.exists) {
      log.warn(`Imagen [${image.originalname}] ya existen.`);
      return res.status(409).json({ message: `Existe una imagen con el mismo nombre: [${image.originalname}].` });
    }
    const imagenCreada = await imageController.create(image);
    imagenesCreadas.push(imagenCreada);
  }

  return res.status(201).json({ data: imagenes, message: "La importación de las imagenes a sido exitosa" });

}))


imagesRouter.post('/single', [jwtAuthenticate], Upload.single('image'), procesarErrores(async (req, res) => {
  const image = req.file;

  const imageExist = await imageController.imageExist(image.originalname);
  if (imageExist) {
    log.warn(`Imagen [${image.originalname}] ya existe.`);
    res.status(409).json({ message: `Existe una imagen con el mismo nombre: [${image.originalname}].` });
    throw new InfoImageInUse();
  }

  const imagenCreada = await imageController.create(image);

  res.status(201).json({ data: imagenCreada });
}));

// Endpoint de visualización de imágenes
imagesRouter.get('/:id', procesarErrores(async (req, res) => {
  let name = req.params.id
  const imagen = await imageController.findByName(name);
  if (imagen == null) {
    // log.warn(`No se encontró la imagen solicitada con nombre [${image.originalname}].`)
    // return res.status(404).json({ message: 'No se encontró la imagen solicitada.' });
    fs.readFile("utils/images/image_not_found.jpg", (err, contenido) => {
      if (err) {
        console.error(err);
        log.error(`Error no controlado al al leer el archivo.`)
        res.status(500).json({ message: 'Error al leer el archivo.' });
      } else {
        res.setHeader('Content-Type', 'image/jpeg');
        res.status(201).send(contenido);
      }
    });
    return
  }


  fs.readFile(imagen.path, (err, contenido) => {
    if (err) {
      console.error(err);
      log.error(`Error no controlado al al leer el archivo.`)
      res.status(500).json({ message: 'Error al leer el archivo.' });
    } else {
      res.setHeader('Content-Type', imagen.type);
      res.status(201).send(contenido);
    }
  });
}))

imagesRouter.delete('/', [jwtAuthenticate], procesarErrores(async (req, res) => {

 
    const resultado = await imageController.deleteAll();

    if (resultado) {
      res.status(201).json({ message: 'Todas las imágenes han sido eliminadas.' });
    } else {
      res.status(201).json({ message: 'No hay imágenes para eliminar.' });
    }

}))

imagesRouter.delete('/:id', [jwtAuthenticate], procesarErrores(async (req, res) => {
  const image_id = req.params.id
  try {
    const resultado = await imageController.destroy(image_id);

    if (resultado) {
      res.status(201).json({ message: 'La imagen han sido eliminada.' });
    } else {
      res.status(201).json({ message: 'No hay imagen para eliminar.' });
    }
  } catch (error) {
    console.error(error);
    log.error(`Error no controlado al eliminar la imagen.`)
    res.status(500).json({ message: 'Error al eliminar la imagen.' });
  }
}))


imagesRouter.get('/', [jwtAuthenticate], procesarErrores(async (req, res) => {
  try {
    const { page = 1, pageSize = 10, name } = req.query;
    let where = {};

    if (name) {
      where.name = { [Op.like]: `%${name}%` }

    }

    const imagenes = await imageController.all(page, pageSize, true, where)

    if (imagenes.length === 0) {
      return res.status(201).json({ message: 'No hay imágenes para mostrar.' });
    }

    // const listaImagenes = imagenes.map(imagen => ({
    //   id: imagen.id,
    //   name: imagen.name,
    //   type: imagen.type
    // }));

    res.status(201).json({ data: imagenes });

  } catch (error) {
    console.error(error);
    log.error(`Error no controlado al obtener la lista de imágenes.`)
    res.status(500).json({ message: 'Error al obtener la lista de imágenes.' });
  }

}))


module.exports = imagesRouter;
