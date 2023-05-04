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
      image_name: "1",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Medium Puppy',
      image_name: "1",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Large Puppy',
      image_name: "1",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 5 años',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Toy & Mini Young Adult Dog',
      image_name: "1",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 5 años',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Medium Young Adult Dog',
      image_name: "1",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 5 años',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Large Young Adult Dog',
      image_name: "1",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Toy & Mini Adult 7',
      image_name: "2",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Medium Adult 7',
      image_name: "2",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Ninguno",
      answer: 'Nutrique Large Adult',
      image_name: "3",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      image_name: "3",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      image_name: "3",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      image_name: "3",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      image_name: "4",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      image_name: "4",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      image_name: "5",

      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Problemas de piel",
      answer: 'Nutrique Skin Sensitivity Dog',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Grande (mas de 8 kilos)',
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
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: 'Menos de 1 año',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '1 a 6 años',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Pequeño (hasta 4 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Mediano (4 hasta 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Perro',
      age: '7 años o mas',
      size: 'Grande (mas de 8 kilos)',
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Healthy Weight Dog',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});




    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: 'Menos de 1 año',
      size: null,
      necessity: "Ninguno",
      answer: 'Nutrique Young Adult CatSteril/H. Weight',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '1 a 5 años',
      size: null,
      necessity: "Ninguno",
      answer: 'Nutrique Young Adult CatSteril/H. Weight',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '6 años o mas',
      size: null,
      necessity: "Ninguno",
      answer: 'Nutrique Young Adult CatSteril/H. Weight',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});



    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: 'Menos de 1 año',
      size: null,
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Baby Cat & Kitten',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '1 a 5 años',
      size: null,
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Young Adult Cat Healthy Maint',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '6 años o mas',
      size: null,
      necessity: "Castrado/Sobrepeso",
      answer: 'Nutrique Adult 7+ Cat Healthy Maintenance',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});


    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: 'Menos de 1 año',
      size: null,
      necessity: "Problema urinario",
      answer: 'Nutrique Urinary Care',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '1 a 5 años',
      size: null,
      necessity: "Problema urinario",
      answer: 'Nutrique Urinary Care',
      image_name: "5",
      createdAt:new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Forms', [{
      pet: 'Gato',
      age: '6 años o mas',
      size: null,
      necessity: "Problema urinario",
      answer: 'Nutrique Urinary Care',
      image_name: "5",
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
