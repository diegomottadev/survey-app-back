const Image   = require('../../../models').Image;
const { Op } = require("sequelize")
const fsp = require('fs').promises;
const fs = require('fs')
const sequelize = require('sequelize');



async function all(page = 1, pageSize = 10, raw = true, where) {

    const options = {
      where,
      offset: page && pageSize ? (page - 1) * pageSize : undefined,
      limit: page && pageSize ? pageSize : null,
      attributes: raw ? undefined : ['name', 'type','path','filename'],
      order: sequelize.literal('CAST(name AS UNSIGNED) ASC'),
    };
    const images = await Image.findAndCountAll(options);
    return raw ? images : images.rows.map(({ name, type,path,filename}) => ({name, type,path,filename}));

  }

function create(image) {
    const filename = image.originalname; // ejemplo: "1.jpg"
    const nameWithoutExtension = filename.split('.')[0]; 
    return Image.create({
      name: nameWithoutExtension,
      type: image.mimetype,
      path: image.path,
      filename: image.filename
    },
    {
      fields: ['name', 'type', 'path', 'filename']
    })
  }

  function findById(id = null) {
    if (!id) throw new Error("No especificó el parámetro id para buscar la imagen")
    return new Promise((resolve, reject) => {
        Image.findOne({ where: { id: id } }).
            then(img => {
                resolve(img)
            })
            .catch(err => {
                reject(err)
            })
    })
}

function findByName(name = null) {
  if (!name) throw new Error("No especificó el parámetro nombre para buscar la imagen")
  return new Promise((resolve, reject) => {
      Image.findOne(
        { where: { name: name },
          attributes: ['name', 'type', 'path', 'filename'] 
        },
        ).
          then(img => {
              resolve(img)
          })
          .catch(err => {
              reject(err)
          })
  })
}
  
  async function deleteAll() {
    const imagenes = await Image.findAll();
    if (imagenes.length === 0) {
        return false;
    }
    
    for (let i = 0; i < imagenes.length; i++) {
      const imagen = imagenes[i];
      const filePath = `uploads/${imagen.filename}`;
    
      try {
        await fsp.access(filePath, fs.constants.F_OK | fs.constants.R_OK);
        await fsp.unlink(filePath);
        console.log(`Archivo ${filePath} eliminado con éxito.`);
      } catch (err) {
        console.error(`Error al eliminar el archivo ${filePath}: ${err}`);
      }
    
      await imagen.destroy();
    }
  
    return true;
  }


  async function destroy(imageId) {
    const image = await Image.findOne({ where: { name: imageId } });
    if (!image) {
        return false;
    }
    const filePath = `uploads/${image.filename}`;

    try {
      await fsp.access(filePath, fs.constants.F_OK | fs.constants.R_OK);
      await fsp.unlink(filePath);
      console.log(`Archivo ${filePath} eliminado con éxito.`);
    } catch (err) {
      console.error(`Error al eliminar el archivo ${filePath}: ${err}`);
    }

    await image.destroy();
      
    return true;
  }
  
  async function searchByName(name) {
    const imagenes = await Image.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    });
  
    return imagenes;
  }
  

  function imageExist(name) {
    const filename = name; // ejemplo: "1.jpg"
    const nameWithoutExtension = filename.split('.')[0];
    return new Promise((resolve, reject) => {
      Image.findOne({
        attributes: ['name'],
        where: {
          name: nameWithoutExtension
        }
      })
        .then(image => {
          const exists = !!image;
          resolve({ exists }); // resolver con objeto que tenga propiedad exists
        })
        .catch(err => {
          reject(err);
        });
    });
  }


  module.exports = {
    create,
    deleteAll,
    destroy,
    searchByName,
    findById,
    all,
    imageExist,
    findByName
  };