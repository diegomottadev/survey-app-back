const clientInstance = require('../../../models').Client;
const { Op } = require("sequelize")

const QRCode = require('qrcode')

async function generateQRCode(code) {
 const options = {
    errorCorrectionLevel: 'M', // Nivel de corrección de errores
    scale: 8 // Escala del código QR
    }
  const qrCode = await QRCode.toDataURL(code,options)
  return qrCode
}

function create(client,codeQr,link) {

    const base64StringWithoutPrefix = codeQr.replace(/^data:image\/png;base64,/, '');
    return clientInstance.create({
        code: client.code,
        name: client.name,
        address: client.address,
        city: client.city,
        province: client.province,
        codeQr: base64StringWithoutPrefix,
        link: link,
        image_id: client.image_id,
    })
}


async function all(page = 1, pageSize = 10, raw = true, where) {
    // Define opciones para la consulta a la base de datos.
    const options = {
       where,
      // Calcula el desplazamiento en función de la página y el tamaño de la página.
      offset: page && pageSize ? (page - 1) * pageSize : undefined,
      // Establece el límite en función del tamaño de la página, o en null para obtener todos los registros.
      limit: page && pageSize ? pageSize : null,
      // Indica si se deben incluir todas las propiedades del modelo o solo algunas.
      attributes: raw ? undefined : ['code', 'name','address','city','province'],

    };
    // Realiza la consulta a la base de datos utilizando las opciones definidas.
    const clients = await clientInstance.findAndCountAll(options);
    // Si el formato de salida es personalizado, mapea los registros a un nuevo arreglo de objetos con las propiedades deseadas.
    return raw ? clients : clients.rows.map(({ code, name,address,city,province }) => ({code, name,address,city,province }));
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

function edit(clientold, client,codeQr,link) {
    const base64StringWithoutPrefix = codeQr.replace(/^data:image\/png;base64,/, '');

    return new Promise(function (resolve, reject) {
        clientInstance.update({
            code: client.code,
            name: client.name,
            address: client.address,
            city: client.city,
            province: client.province,
            codeQr: base64StringWithoutPrefix,
            link: link
        }, {
            where: {
                id: clientold.id
            }
        }).then(() => {
            let response = findById(clientold.id);
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
