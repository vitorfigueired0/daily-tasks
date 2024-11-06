'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) { 
			User.hasMany(models.Task, {
				foreignKey: 'userId',
				as: 'tasks'
			})

			User.hasMany(models.Tag, {
				foreignKey: 'userId',
				as: 'tags'
			})
		};
	}

	User.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: sequelize.fn('NOW')
			}
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'Users',
		}
	);
	
	return User;
}

