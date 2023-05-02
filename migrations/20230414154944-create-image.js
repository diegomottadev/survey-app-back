'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   type: Sequelize.INTEGER
      // },
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.TEXT
      },
      filename: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};