const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
		"hr",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			region: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			depatures: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			volunteer_depatures: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			locum_depatures: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			sja_depatures: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			sja_associates: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			total_staff_month: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			new_contracts: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			contract_staff: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			year: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			month: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "hr_data",
			timestamps: true,
			indexes: [],
		}
  );
};
