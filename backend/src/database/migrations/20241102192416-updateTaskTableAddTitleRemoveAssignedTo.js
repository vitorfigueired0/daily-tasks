'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Empty Title',
    });

    await queryInterface.removeColumn('Tasks', 'assignedTo');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'assignedTo', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn('Tasks', 'title');
  }
};
  