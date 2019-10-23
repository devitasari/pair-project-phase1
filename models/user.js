'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const hashPass = require('../helpers/hashPassword')
  class User extends Model {}

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {sequelize,
    hooks : {
      beforeCreate : (user,options) => {
        user.pass = hashPass(user.pass)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Doctor, {
      through: models.DoctorUser
    })
  };
  return User;
};