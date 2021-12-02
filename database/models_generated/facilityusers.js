const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facilityusers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    facility: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facilities',
        key: 'id'
      }
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'facilityusers',
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
        name: "facility",
        using: "BTREE",
        fields: [
          { name: "facility" },
        ]
      },
      {
        name: "user",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
};
