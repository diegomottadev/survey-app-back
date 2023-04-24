'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Survey.belongsTo(models.Client,{foreignKey:"client_id",targetKey:"id", as:"client"})
      Survey.belongsTo(models.Image,{foreignKey:"image_name",targetKey:"name", as:"image"})

    }
  }
  Survey.init({
    pet: DataTypes.STRING,
    age: DataTypes.STRING,
    size: DataTypes.STRING,
    necessity: DataTypes.STRING,
    telephone: DataTypes.STRING,
    name: DataTypes.STRING,
    answer: DataTypes.STRING,
    client_id: DataTypes.BIGINT,
    image_name: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Survey',
  });
  return Survey;
};