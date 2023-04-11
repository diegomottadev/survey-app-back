const clientInstance = require('../../../models').Client;
const { Op } = require("sequelize")

const QRCode = require('qrcode')

async function generateQRCode(code) {
  const qrCode = await QRCode.toDataURL(code)
  return qrCode
}

function create(client,codeQr) {
    return clientInstance.create({
        code: client.code,
        name: client.name,
        address: client.address,
        city: client.city,
        province: client.province,
        codeQr: codeQr
    })
}


function all(page = 1, pageSize = 10, raw = false) {
    const options = {
      offset: (page - 1) * pageSize,
      limit: pageSize,
      attributes: { exclude: raw ? [] : ['createdAt', 'updatedAt'] },
    };
    return clientInstance.findAll(options);
  }

function findById(id = null) {
    if (!id) throw new Error("No especifico el parametro id para buscar el cliente")
    return new Promise((resolve, reject) => {
        clientInstance.findOne({ where: { id: id } }).
            then(client => {
                resolve(client)
            })
            .catch(err => {
                reject(err)
            })
    })
}


function bulkCreate(clients) {
    return clientInstance.bulkCreate(clients)
}

function findByCode(code = null) {
    if (!code) throw new Error("No especifico el parametro código para buscar el cliente")
    return new Promise((resolve, reject) => {
        clientInstance.findOne({ where: { code: code } }).
            then(client => {
                resolve(client)
            })
            .catch(err => {
                reject(err)
            })
    })
}

function findByName(name = null) {
    if (id) return clientInstance.findOne({ where: { name: name } })
    throw new Error("No especifico el parametro nombre para buscar el cliente")
}

function clienteExist( code ) {
    return new Promise((resolve, reject) => {
        clientInstance.findAll({
            where: {
                [Op.or]: [
                    {
                        code: code
                    }
                ]
            }
        }).then(clients => {
            resolve(clients.length > 0)
        })
        .catch(err => {
            reject(err)
        })
    })

}

function edit(code, client,codeQr) {

    return new Promise(function (resolve, reject) {
        clientInstance.update({
            code: client.code,
            name: client.name,
            address: client.address,
            city: client.city,
            province: client.province,
            codeQr: codeQr
        }, {
            where: {
                code: code
            }
        }).then(() => {
            let response = findByCode(code);
            resolve(response);
        });
    })
}

function destroy(id, cientToDelete) {
    return new Promise(function (resolve, reject) {
        return clientInstance.destroy({
            where: {
                id: id // criteria
            }
        }).then((result) => {
            resolve(cientToDelete);
        });
    })
}

function allDestroy(){
    return clientInstance.destroy({ truncate: true })
}


module.exports = {
    create,
    all,
    edit,
    clienteExist,
    destroy,
    findById,
    findByName,
    findByCode,
    bulkCreate,
    generateQRCode,
    allDestroy
}