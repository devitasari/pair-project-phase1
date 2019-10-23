'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class DoctorUser extends Model {}

  DoctorUser.init({
    DoctorId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    status: DataTypes.STRING
  }, {sequelize});
  DoctorUser.associate = function(models) {
    // associations can be defined here
    // DoctorUser.hasMany(models.Doctor)
    // DoctorUser.hasMany(models.User)
  };
  return DoctorUser;
};