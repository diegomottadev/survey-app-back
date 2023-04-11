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

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Toy & Mini Puppy',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Medium Puppy',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Large Puppy',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 5 años',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Toy & Mini Young Adult Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 5 años',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Medium Young Adult Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 5 años',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Large Young Adult Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Toy & Mini Adult 7',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Medium Adult 7',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Large Adult',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Grande (mas 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Grande (mas 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Grande (mas 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});




    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Grande (mas 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Grande (mas 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Grande (mas 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});




    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: 'Menos de 1 año',
      size: null,
      necessity: "Ninguno",
      answer: 'Nutrique Young Adult CatSteril/H. Weight',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '1 a 5 años',
      size: null,
      necessity: "Ninguno",
      answer: 'Nutrique Young Adult CatSteril/H. Weight',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '6 años o mas',
      size: null,
      necessity: "Ninguno",
      answer: 'Nutrique Young Adult CatSteril/H. Weight',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});



    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: 'Menos de 1 año',
      size: null,
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Baby Cat & Kitten',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '1 a 5 años',
      size: null,
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Young Adult Cat Healthy Maint',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '6 años o mas',
      size: null,
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Adult 7+ Cat Healthy Maintenance',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});


    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: 'Menos de 1 año',
      size: null,
      necessity: "Problema urinario",
      answer: 'Nutrique Urinary Care',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '1 a 5 años',
      size: null,
      necessity: "Problema urinario",
      answer: 'Nutrique Urinary Care',
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '6 años o mas',
      size: null,
      necessity: "Problema urinario",
      answer: 'Nutrique Urinary Care',
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
    await queryInterface.bulkDelete('Forms', null, {});

  }
};
