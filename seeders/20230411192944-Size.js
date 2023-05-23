'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Sizes', [{
      name: 'Pequeño (hasta 4 kg)',
      pet_id: 1,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Sizes', [{
      name: 'Mediano (4 hasta 8 kg)',
      pet_id: 1,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Sizes', [{
      name: 'Grande (mas de 8 kg)',
      pet_id: 1,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Sizes', null, {});
  }
};
