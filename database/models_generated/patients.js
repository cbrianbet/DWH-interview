const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patients', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    facility: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facilities',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'patients',
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
    ]
  });
};
