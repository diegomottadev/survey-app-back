const Survey   = require('../../../models').Survey;

const Client   = require('../../../models').Client;
async function all(page = 1, pageSize = 10, raw = true) {

    const options = {
      offset: page && pageSize ? (page - 1) * pageSize : undefined,
      limit: page && pageSize ? pageSize : null,
      attributes: raw ? undefined : ['pet', 'age','size','necessity','answer','name','telephone','client_id'],
      include: {
        model: Client,
        as: 'client',
        attributes: ['code','name', 'address', 'city', 'province'],
      },
    };
    const surveys = await Survey.findAll(options);
    return raw ? surveys : surveys.map(({pet, age,size,necessity,answer,name,telephone,client_id }) => ({pet, age,size,necessity,answer,name,telephone,client_id}));

  }


function create(pet, age, size, necessity, answer,name, telephone,client_code) {
    return Survey.create({
        pet: pet,
        age: age,
        size: size,
        necessity:necessity,
        answer:answer,
        client_id: client_code
    })
}


module.exports  = {   
    create,
    all
}
