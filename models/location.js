'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Location extends Model {}
  Location.init({
    name: DataTypes.STRING
  }, {sequelize});
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Doctor)
  };
  return Location;
};