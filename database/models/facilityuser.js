'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facilityUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  facilityUser.init({
    facility: DataTypes.INTEGER,
    user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'facilityUser',
  });
  return facilityUser;
};