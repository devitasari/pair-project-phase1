'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Specialisasi extends Model {}
  Specialisasi.init({
    name: DataTypes.STRING
  }, {sequelize});
  Specialisasi.associate = function(models) {
    // associations can be defined here
    Specialisasi.hasMany(models.Doctor)
  };
  return Specialisasi;
};