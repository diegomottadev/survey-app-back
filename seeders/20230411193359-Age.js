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


        
    await queryInterface.bulkInsert('Ages', [{
      name: 'Menos de 1 año',
      pet_id: 1,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    
    await queryInterface.bulkInsert('Ages', [{
      name: '1 a 5 años',
      pet_id: 1,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    
    await queryInterface.bulkInsert('Ages', [{
      name: '1 a 6 años',
      pet_id: 1,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    
    await queryInterface.bulkInsert('Ages', [{
      name: '7 años o mas',
      pet_id:1,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Ages', [{
      name: 'Menos de 1 año',
      pet_id: 2,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Ages', [{
      name: '1 a 5 años',
      pet_id: 2,
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Ages', [{
      name: '6 años o mas',
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

    await queryInterface.bulkDelete('Ages', null, {});
  }
};
