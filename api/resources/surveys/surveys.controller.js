const Survey   = require('../../../models').Survey;

const Client   = require('../../../models').Client;
const Image   = require('../../../models').Image;

async function all(page = 1, pageSize = 10, raw = true) {

    const options = {
      offset: page && pageSize ? (page - 1) * pageSize : undefined,
      limit: page && pageSize ? pageSize : null,
      attributes: raw ? undefined : ['pet', 'age','size','necessity','answer','name','telephone','email','client_id','image_name'],
      include: [{
          model: Client,
          as: 'client',
          attributes: ['code','name', 'address', 'city', 'province'],
        },
        // {
        //   model: Image,
        //   as: 'image',
        //   attributes: ['name', 'type', 'path', 'filename'],
        //   exclude: ['id']
        // }
      ],
    };
    const surveys = await Survey.findAndCountAll(options);
    return raw ? surveys : surveys.map(({pet, age,size,necessity,answer,name,telephone,image_name,client  }) => ({pet, age,size,necessity,answer,name,telephone,image_name,client_code: client.code,}));

  }


function create(pet, age, size, necessity, answer,client_id,image_id) {
    return Survey.create({
        pet: pet,
        age: age,
        size: size,
        necessity:necessity,
        answer:answer,
        client_id: client_id,
        image_name: image_id
    })
}

function edit(id, name, telephone,email) {

  return new Promise(function (resolve, reject) {
    Survey.update({
          name: name,
          telephone: telephone,
          email: email,
      }, {
          where: {
              id: id
          }
      }).then(() => {
          let response = findById(id);
          resolve(response);
      });
  })
}

function findById(id = null) {
  if (!id) throw new Error("No especifico el parametro id para buscar la encuesta")
  return new Promise((resolve, reject) => {
    Survey.findOne({ where: { id: id } }).
          then(age => {
              resolve(age)
          })
          .catch(err => {
              reject(err)
          })
  })
}


module.exports  = {   
    create,
    all,
    edit,
    findById
}
