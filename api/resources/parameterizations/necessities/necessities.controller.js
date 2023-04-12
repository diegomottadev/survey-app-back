const Necessity = require('../../../../models').Necessity;
const { Op } = require("sequelize");

function create(necessity) {
  return Necessity.create({
    name: necessity.name,
    pet_id: necessity.pet_id,
  });
}

async function all(page = 1, pageSize = 10, raw = true) {
  const options = {
    offset: page && pageSize ? (page - 1) * pageSize : undefined,
    limit: page && pageSize ? pageSize : null,
    attributes: raw ? undefined : ['name', 'pet_id'],
  };
  const necessities = await Necessity.findAll(options);
  return raw ? necessities : necessities.map(({ name, pet_id }) => ({ name, pet_id }));
}

function findById(id = null) {
  if (!id) throw new Error("No se especificó el parámetro ID para buscar la necesidad.");
  return Necessity.findOne({ where: { id: id } });
}

function findByName(name = null) {
  if (!name) throw new Error("No se especificó el parámetro nombre para buscar la necesidad.");
  return Necessity.findOne({ where: { name: name } });
}

function necessityExists(name) {
  return Necessity.findOne({
    where: {
      [Op.or]: [{ name: name }]
    }
  }).then(necessity => !!necessity);
}

function edit(id, necessity) {
  return Necessity.update({
    name: necessity.name,
    pet_id: necessity.pet_id,
  }, {
    where: { id: id }
  }).then(() => findById(id));
}

function destroy(id) {
  return Necessity.findByPk(id).then(necessity => {
    if (!necessity) throw new Error(`No se encontró la necesidad con ID ${id}.`);
    return Necessity.destroy({ where: { id: id } }).then(() => necessity);
  });
}

function allDestroy() {
  return Necessity.destroy({ where: {} });
}

module.exports = {
  create,
  all,
  edit,
  necessityExists,
  destroy,
  findById,
  findByName,
  allDestroy,
};
