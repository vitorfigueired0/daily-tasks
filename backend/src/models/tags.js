'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Tag extends Model {
		static associate(models) {
			Tag.belongsToMany(models.Task, {
				through: 'TaskTags',
				foreignKey: 'tagId',
				otherKey: 'taskId'
			});
		}
	}

	Tag.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			backgroundHex: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '#E1F6FF',
			},
			nameHex: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '#2C62B4',
			},
		},
		{
			sequelize,
			modelName: 'Tag',
			tableName: 'Tags',
		}
	);

	return Tag;
};
