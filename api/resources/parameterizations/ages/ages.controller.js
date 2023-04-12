const agesInstance = require('../../../../models').Age;
const { Op } = require("sequelize")


function create(age) {
    return agesInstance.create({
        name: age.name,
        pet_id: age.pet_id,
    })
}


// Esta función recupera todos los registros de la tabla `ages` con opciones de paginación y formato de salida personalizado.
// page: número de página (opcional, predeterminado: 1)
// pageSize: tamaño de página (opcional, predeterminado: 10)
// raw: indicador de formato de salida personalizado (opcional, predeterminado: true)
async function all(page = 1, pageSize = 10, raw = true) {
    // Define opciones para la consulta a la base de datos.
    const options = {
      // Calcula el desplazamiento en función de la página y el tamaño de la página.
      offset: page && pageSize ? (page - 1) * pageSize : undefined,
      // Establece el límite en función del tamaño de la página, o en null para obtener todos los registros.
      limit: page && pageSize ? pageSize : null,
      // Indica si se deben incluir todas las propiedades del modelo o solo algunas.
      attributes: raw ? undefined : ['name', 'pet_id'],
    };
    // Realiza la consulta a la base de datos utilizando las opciones definidas.
    const ages = await agesInstance.findAll(options);
    // Si el formato de salida es personalizado, mapea los registros a un nuevo arreglo de objetos con las propiedades deseadas.
    return raw ? ages : ages.map(({ name, pet_id }) => ({ name, pet_id }));
  }

function findById(id = null) {
    if (!id) throw new Error("No especifico el parametro id para buscar la edad")
    return new Promise((resolve, reject) => {
        agesInstance.findOne({ where: { id: id } }).
            then(age => {
                resolve(age)
            })
            .catch(err => {
                reject(err)
            })
    })
}


function findByName(name = null) {
    if (id) return agesInstance.findOne({ where: { name: name } })
    throw new Error("No especifico el parametro nombre para buscar la edad")
}

function ageExist( name ) {
    return new Promise((resolve, reject) => {
        agesInstance.findAll({
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

function edit(id, age) {

    return new Promise(function (resolve, reject) {
        agesInstance.update({
            name: age.name,
            pet_id: age.pet_id,
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

function destroy(id, ageToDelete) {
    return new Promise(function (resolve, reject) {
        return agesInstance.destroy({
            where: {
                id: id // criteria
            }
        }).then((result) => {
            resolve(ageToDelete);
        });
    })
}

function allDestroy(){
    return agesInstance.destroy({ where: {} });

}

module.exports = {
    create,
    all,
    edit,
    ageExist,
    destroy,
    findById,
    findByName,
    ageExist,
    allDestroy
}
