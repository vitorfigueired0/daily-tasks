'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		static associate(models) {
			Task.belongsToMany(models.Tag, {
				through: 'TaskTags',
				foreignKey: 'taskId',
				otherKey: 'tagId'
			});
		}
	}

	Task.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'Empty Title',
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM('pending', 'inProgress', 'completed'),
				allowNull: false,
				defaultValue: 'pending',
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.fn('NOW'),
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.fn('NOW'),
			},
		},
		{
			sequelize,
			modelName: 'Task',
			tableName: 'Tasks',
		}
	);

	return Task;
};
