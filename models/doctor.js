'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const hashPassword = require('../helpers/hashPassword')
  class Doctor extends Model {}

  Doctor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    address: DataTypes.STRING,
    tarif: DataTypes.INTEGER,
    workingHours: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    SpecialisasiId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER,
    isLogin : DataTypes.INTEGER
  }, {
    hooks : {
      beforeCreate : (doctor,options) => {
        doctor.pass = hashPassword(doctor.pass)
      }
    },
    sequelize});
  Doctor.associate = function(models) {
    // associations can be defined here


    // Doctor.belongsTo(models.DoctorUser)
    Doctor.belongsTo(models.Location)
    Doctor.belongsTo(models.Specialisasi)

    Doctor.belongsToMany(models.User, {
      through : models.DoctorUser
    })
  };
  return Doctor;
};