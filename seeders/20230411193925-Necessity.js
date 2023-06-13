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

    await queryInterface.bulkInsert('Necessities', [{
      name: 'Ninguno',
      pet_id: 1,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Necessities', [{
      name: 'Problemas de piel',
      pet_id: 1,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Necessities', [{
      name: 'Castrado/Sobrepeso',
      pet_id: 1,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});


    await queryInterface.bulkInsert('Necessities', [{
      name: 'Ninguno',
      pet_id: 2,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Necessities', [{
      name: 'Castrado/Sobrepeso',
      pet_id: 2,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Necessities', [{
      name: 'Problemas urinarios',
      pet_id: 2,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Necessities', [{
      name: 'Problemas de piel',
      pet_id: 2,
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
    await queryInterface.bulkDelete('Necessities', null, {});
  }
};
