const Survey   = require('../../../models').Survey;

function create(pet, age, size, necessity, name, telephone,answer,client_id) {
    return Survey.create({
        pet: pet,
        age: age,
        size: size,
        necessity:necessity,
        name: name,
        telephone: telephone,
        answer:answer,
        client_id: client_id
    })
}

module.exports  = {   
    create
}
