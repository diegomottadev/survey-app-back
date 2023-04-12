const petsInstance = require('../../../../models').Pet;
const { Op } = require("sequelize")

function create(pet) {
    return petsInstance.create({
        name: pet.name,
    })
}

async function all(page = 1, pageSize = 10, raw = true) {
    const options = {
      offset: page && pageSize ? (page - 1) * pageSize : undefined,
      limit: page && pageSize ? pageSize : null,
      attributes: raw ? undefined : ['name'],
    };
    const pets = await petsInstance.findAll(options);
    return raw ? pets : pets.map(({ name }) => ({ name }));
  }

function findById(id = null) {
    if (!id) throw new Error("No especificó el parámetro id para buscar la mascota")
    return new Promise((resolve, reject) => {
        petsInstance.findOne({ where: { id: id } }).
            then(pet => {
                resolve(pet)
            })
            .catch(err => {
                reject(err)
            })
    })
}

function findByName(name = null) {
    if (name) return petsInstance.findOne({ where: { name: name } })
    throw new Error("No especificó el parámetro nombre para buscar la mascota")
}

function petExist(name) {
    return new Promise((resolve, reject) => {
        petsInstance.findAll({
            where: {
                [Op.or]: [
                    {
                        name: name
                    }
                ]
            }
        }).then(pets => {
            resolve(pets.length > 0)
        })
        .catch(err => {
            reject(err)
        })
    })

}

function edit(id, pet) {
    return new Promise(function (resolve, reject) {
        petsInstance.update({
            name: pet.name,
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

function destroy(id, petToDelete) {
    return new Promise(function (resolve, reject) {
        return petsInstance.destroy({
            where: {
                id: id // criteria
            }
        }).then((result) => {
            resolve(petToDelete);
        });
    })
}

function allDestroy(){
    return petsInstance.destroy({ where: {} });

}

module.exports = {
    create,
    all,
    edit,
    petExist,
    destroy,
    findById,
    findByName,
    allDestroy
}
