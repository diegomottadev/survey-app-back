const Image   = require('../../../models').Image;
const { Op } = require("sequelize")
const fs = require('fs').promises;


async function all(page = 1, pageSize = 10, raw = true) {

    const options = {
      offset: page && pageSize ? (page - 1) * pageSize : undefined,
      limit: page && pageSize ? pageSize : null,
      attributes: raw ? undefined : ['name', 'type','path','filename'],
    };
    const images = await Image.findAll(options);
    return raw ? images : images.map(({ name, type,path,filename}) => ({name, type,path,filename}));

  }

function create(image) {
    console.log(image);
    return Image.create({
      name: image.originalname,
      type: image.mimetype,
      path: image.path,
      filename: image.filename
    });
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
      Image.findOne({ where: { name: name } }).
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
      await imagen.destroy();
      await fs.unlink(`uploads/${imagen.name}`);
    }
  
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
  

  function imageExist( name ) {
    return new Promise((resolve, reject) => {
        Image.findAll({
            where: {
                [Op.or]: [
                    {
                        name: name
                    }
                ]
            }
        }).then(ages => {
            resolve(ages.length > 0)
        })
        .catch(err => {
            reject(err)
        })
    })

}


  module.exports = {
    create,
    deleteAll,
    searchByName,
    findById,
    all,
    imageExist,
    findByName
  };