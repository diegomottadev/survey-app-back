'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
   

    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {        
      type:DataTypes.STRING,
      validate:{
          notEmpty:{
              args:true,
              msg:"Email es requerido"
          },
          isEmail:{
              args:true,
              msg:'Email válido es requerido'
          },
          isUnique: (value, next) => {
            User.findAll({
              where: { email: value },
              attributes: ['id'],
            })
              .then((user) => {
                if (user.length != 0)
                  next(new Error('Email ya existe'));
                next();
              })
              .catch((onError) => console.log(onError));
          },
      }
    },
    password: {        
      type:DataTypes.STRING,
      validate:{
          notEmpty:{
              args:true,
              msg:"Contraseña es requerido"
          },
      }
    },
    confirmedAt: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'User',
  });
  return User;
};
