'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  facilities.init({
    name: DataTypes.STRING,
    mfl_code: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'facilities',
  });
  return facilities;
};