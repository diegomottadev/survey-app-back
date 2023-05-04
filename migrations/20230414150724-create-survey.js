'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Surveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pet: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      necessity: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      
      answer: {
        type: Sequelize.STRING
      },
      client_id: {
        type: Sequelize.BIGINT,
        reference: 'Clients',
        referenceKey: 'id'
      },
      image_name: {
        type: Sequelize.STRING,
        reference: 'Images',
        referenceKey: 'name'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Surveys');
  }
};