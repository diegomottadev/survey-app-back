const formInstance   = require('../../../models').Form;

function create(form) {
  console.table(form)

  return formInstance.create({
    pet: form.pet,
    age: form.age,
    size: form.size,
    necessity: form.necessity,
    answer: form.answer,
    image_name: form.image_name
  })
}

async function all(page = 1, pageSize = 10, raw = true) {

    const options = {
      offset: page && pageSize ? (page - 1) * pageSize : undefined,
      limit: page && pageSize ? pageSize : null,
      attributes: raw ? undefined : ['pet', 'age','size','necessity','answer'],
    };
    const forms = await formInstance.findAll(options);
    return raw ? forms : forms.map(({pet, age,size,necessity,answer }) => ({pet, age,size,necessity,answer}));

  }

function find (pet,age,size,necessity) {

  if(!pet || !age || !size || !necessity) throw new Error("No especifico los parametros para buscar el producto")

  let sizeP = size == 'null' ? null : size

  return formInstance.findOne({ 
          where: { 
          pet: pet.trim(), 
          age: age.trim(), 
          size: sizeP, 
          necessity: necessity.trim() 
          },
          attributes: ['pet', 'age', 'size','necessity','answer','image_name']
      }
  )
}


function allDestroy(){
  return formInstance.destroy({ truncate: true })
}

module.exports  = {
    find,
    all,
    allDestroy,
    create
}
