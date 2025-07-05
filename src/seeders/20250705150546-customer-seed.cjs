'use strict'

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Customers', [
      {
        name: 'Agnaldo',
        email: 'email@agnaldo.com',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Benedita',
        email: 'email@benedita.com',
        phone: '0987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carlos',
        email: 'email@carlos.com',
        phone: '1122334455',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Customers', null, {})
  },
}
