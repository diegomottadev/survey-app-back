const sizesInstance = require('../../../../models').Size;
const { Op } = require("sequelize")

function create(size) {
    return sizesInstance.create({
        name: size.name,
        pet_id: size.pet_id,
    })
}

async function all(page = 1, pageSize = 10, raw = true) {
    const options = {
        offset: page && pageSize ? (page - 1) * pageSize : undefined,
        limit: page && pageSize ? pageSize : null,
        attributes: raw ? undefined : ['name', 'pet_id'],
    };
    const sizes = await sizesInstance.findAll(options);
    return raw ? sizes : sizes.map(({ name, pet_id }) => ({ name, pet_id }));
}

function findById(id = null) {
    if (!id) throw new Error("No especifico el parametro id para buscar el tamaño")
    return new Promise((resolve, reject) => {
        sizesInstance.findOne({ where: { id: id } }).
            then(size => {
                resolve(size)
            })
            .catch(err => {
                reject(err)
            })
    })
}

function findByName(name = null) {
    if (!name) throw new Error("No especifico el parametro nombre para buscar el tamaño")
    return sizesInstance.findOne({ where: { name: name } })
}

function sizeExist(name) {
    return new Promise((resolve, reject) => {
        sizesInstance.findAll({
            where: {
                [Op.or]: [
                    {
                        name: name
                    }
                ]
            }
        }).then(sizes => {
            resolve(sizes.length > 0)
        })
        .catch(err => {
            reject(err)
        })
    })
}

function edit(id, size) {
    return new Promise(function (resolve, reject) {
        sizesInstance.update({
            name: size.name,
            pet_id: size.pet_id,
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

function destroy(id, sizeToDelete) {
    return new Promise(function (resolve, reject) {
        return sizesInstance.destroy({
            where: {
                id: id
            }
        }).then((result) => {
            resolve(sizeToDelete);
        });
    })
}

function allDestroy() {
    return sizesInstance.destroy({ where: {} });
}

module.exports = {
    create,
    all,
    edit,
    sizeExist,
    destroy,
    findById,
    findByName,
    allDestroy
}
