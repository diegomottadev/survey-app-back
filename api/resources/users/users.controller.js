const userInstance   = require('../../../models').User;

const { Op, Association } = require("sequelize")

async function create(user,password) {
      
        //devuelven promesas las funciones .create .findOne
        const userCreated = await userInstance.create ({
                name: user.name,
                email: user.email,
                password: password,
                active: true
        })
        
}
 
function all() {
     return userInstance.findAll({where:{
        id: { [Op.not]: null }
      },})
}

 function find (id =null,name=null,email=null) {

    if(id) return userInstance.findOne({ where: { id: parseInt(id)  }})
    if(email) return userInstance.findOne({ where: { email: email }})
    if(name) return userInstance.findOne({ where: { name: name  }})

    throw new Error("No especifico un parametro de buscar el usuario")
}

function findByEmail (email) {
    if(email) return userInstance.findOne({ where: {   email: email }})

    throw new Error("No especifico un email para buscar el usuario")
}

function userExist({email}){
    return new Promise((resolve,reject) => {
        userInstance.findAll({
            where: { email: email }
        }).then(users =>{
            resolve(users.length > 0)
        })
        .catch(err =>{
            reject(err)
        })
    })

}

function edit(id,user){

    return new Promise(function(resolve, reject) {
        userInstance.update({
            name: user.name,
            email: user.email
        },{
            where:{
                id: id
            }
        }).then(() =>{
                let response = find(id);                      
                resolve(response);
        }); 
    })
}

function destroy(id,userToDelete){
    return new Promise(function(resolve, reject) {
        return userInstance.destroy({
            where: {
                id: id // criteria
            }
        }).then((result) =>{          
                resolve(userToDelete);
        }); 
    })
}

module.exports  = {
    create,
    all,
    find,
    edit,
    userExist,
    destroy,
    findByEmail
}
