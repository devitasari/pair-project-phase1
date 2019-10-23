'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Doctors', 'isLogin', Sequelize.INTEGER);

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Doctors', 'isLogin');

  }
};
