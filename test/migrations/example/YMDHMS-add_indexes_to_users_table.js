'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Users', ['email'], {
      unique: true, // Ensure email is unique
      name: 'users_email_unique_index'
    });

    await queryInterface.addIndex('Users', ['username'], {
      unique: true, // Ensure username is unique
      name: 'users_username_unique_index'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Users', 'users_email_unique_index');
    await queryInterface.removeIndex('Users', 'users_username_unique_index');
  }
};
