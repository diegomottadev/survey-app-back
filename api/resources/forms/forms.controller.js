const formInstance   = require('../../../models').Form;

function find (pet,age,size,necessity) {

        if(!pet || !age || !size || !necessity) throw new Error("No especifico los parametros para buscar el producto")


        return formInstance.findOne({ 
                where: { 
                pet: pet, 
                age: age, 
                size: size, 
                necessity: necessity 
                }
            }
        )

}

module.exports  = {
    find
}
