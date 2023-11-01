var DataTypes = require("sequelize").DataTypes;
var _accesslevels = require("./accesslevels");
var _facilities = require("./facilities");
var _facilityusers = require("./facilityusers");
var _patients = require("./patients");
var _pushdata = require("./pushdata");
var _sequelizemeta = require("./sequelizemeta");
var _users = require("./users");
var _hr = require("./hr");

function initModels(sequelize) {
  var accesslevels = _accesslevels(sequelize, DataTypes);
  var facilities = _facilities(sequelize, DataTypes);
  var facilityusers = _facilityusers(sequelize, DataTypes);
  var patients = _patients(sequelize, DataTypes);
  var pushdata = _pushdata(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var hr = _hr(sequelize, DataTypes);

  users.belongsTo(accesslevels, { as: "accesslevel_accesslevel", foreignKey: "accesslevel"});
  accesslevels.hasMany(users, { as: "users", foreignKey: "accesslevel"});
  facilityusers.belongsTo(facilities, { as: "facility_facility", foreignKey: "facility"});
  facilities.hasMany(facilityusers, { as: "facilityusers", foreignKey: "facility"});
  patients.belongsTo(facilities, { as: "facility_facility", foreignKey: "facility"});
  facilities.hasMany(patients, { as: "patients", foreignKey: "facility"});
  pushdata.belongsTo(facilities, { as: "facility_facility", foreignKey: "facility"});
  facilities.hasMany(pushdata, { as: "pushdata", foreignKey: "facility"});
  pushdata.belongsTo(facilityusers, { as: "facilityuser_facilityuser", foreignKey: "facilityuser"});
  facilityusers.hasMany(pushdata, { as: "pushdata", foreignKey: "facilityuser"});
  facilityusers.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(facilityusers, { as: "facilityusers", foreignKey: "user"});

  return {
    accesslevels,
    facilities,
    facilityusers,
    patients,
    pushdata,
    sequelizemeta,
    users,
    hr
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
