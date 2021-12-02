const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pushdata', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    datepushed: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    facility: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facilities',
        key: 'id'
      }
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    facilityuser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facilityusers',
        key: 'id'
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pushdata',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "pushdata_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "facility" },
        ]
      },
      {
        name: "pushdata_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "facilityuser" },
        ]
      },
    ]
  });
};
