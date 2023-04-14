'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Form.init({
    pet: DataTypes.STRING,
    age: DataTypes.STRING,
    size: DataTypes.STRING,
    necessity: DataTypes.STRING,
    answer: DataTypes.STRING,
    nombre: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Form',
  });
  return Form;
};