'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Necessity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Necessity.belongsTo(models.Pet,{foreignKey:"pet_id",targetKey:"id", as:"pet"})

    }
  }
  Necessity.init({
    pet_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  },{
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'Necessity',
  });
  return Necessity;
};