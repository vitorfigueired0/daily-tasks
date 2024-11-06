'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      backgroundHex: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '#E1F6FF'
      },
      nameHex: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '#2C62B4'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Tags');
  }
};
