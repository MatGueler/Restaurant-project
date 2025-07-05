'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('MenuItems', [
      {
        name: 'Frango assado',
        description: 'Frango assado com tempero especial',
        price: 25.0,
        category: 'main_course',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Limonada',
        description: 'Limonada fresca e gelada',
        price: 8.5,
        category: 'drink',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Salada Caesar',
        description: 'Salada Caesar com frango grelhado',
        price: 20.0,
        category: 'starter',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Torta de chocolate',
        description: 'Deliciosa torta de chocolate com sorvete',
        price: 12.0,
        category: 'dessert',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Espaguete à bolonhesa',
        description: 'Espaguete com molho de carne moída',
        price: 18.0,
        category: 'main_course',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Água mineral',
        description: 'Água mineral natural',
        price: 5.0,
        category: 'drink',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bruschetta de tomate',
        description: 'Bruschetta com tomate fresco e manjericão',
        price: 10.0,
        category: 'starter',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pudim de leite condensado',
        description: 'Pudim cremoso de leite condensado',
        price: 9.0,
        category: 'dessert',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MenuItems', null, {})
  },
}
