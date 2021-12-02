'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pushdata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pushdata.init({
    datapushed: DataTypes.BOOLEAN,
    facility: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    facilityuser: DataTypes.INTEGER,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pushdata',
  });
  return pushdata;
};