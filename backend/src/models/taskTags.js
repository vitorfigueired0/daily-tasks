'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class TaskTag extends Model {
		static associate(models) { }
	}

	TaskTag.init(
		{
			taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tasks',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
			modelName: 'TaskTag',
			tableName: 'TaskTags',
		}
	);

	return TaskTag;
};
