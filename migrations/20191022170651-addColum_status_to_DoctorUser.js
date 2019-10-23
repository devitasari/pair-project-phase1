'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('DoctorUsers', 'status', Sequelize.STRING);

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('DoctorUsers', 'status');

  }
};
