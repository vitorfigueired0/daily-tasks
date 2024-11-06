const { where } = require('sequelize');
const { Task, TaskTag, Tag } = require('../models');

const createTask = async (req, res) => {
  try {
    const { title, description, status, tags } = req.body;
    await verifyTags(tags, req.currentUser)

    const task = await Task.create({ title, description, status, tags, userId: req.currentUser.uid },
      {
        returning: ['id', 'title', 'description', 'status']
      }
    );

    if (tags) {
      associateTags(task.id, tags)
    }

    const taskView = mapTaskView(task);
    return res.status(201).json(taskView);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  const hasQueryParameter = Object.keys(req.query).length > 0
  let joinWhereClause = {}

  if (hasQueryParameter) {
    joinWhereClause.id = req.query.tag
  }

  try {
    const tasks = await Task.findAll({
      attributes: ['id', 'title', 'description', 'status'],
      include: [{
        model: Tag,
        attributes: ['id', 'name', 'nameHex', 'backgroundHex'],
        required: hasQueryParameter,
        through: { attributes: [] },
        where: joinWhereClause,
        as: 'tags'
      }],
      where: { userId: req.currentUser.uid }
    });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [{
        model: Tag,
        required: true,
        through: { attributes: [] }
      }]
    });

    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findByPk(req.params.id, {
      attributes: ['id']
    });

    if (task) {
      await task.update({ title, description, status });
      await task.reload();

      return res.status(200).json(task);
    } else {
      return res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task) {
      await task.destroy();

      return res.status(204).send();
    } else {
      return res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const associateTags = (taskId, tags) => {
  tags.forEach(async tag => {
    await TaskTag.create(
      { taskId, tagId: tag.tagId },
      { fields: ['taskId', 'tagId'], returning: ['taskId', 'tagId'] },
    )
  });
}

const verifyTags = async (tags, user) => {
  if(!tags) return;
  
  for (let tag of tags) {
    const dbTag = await Tag.findByPk(tag.tagId, { attributes: ['id', 'userId'] })

    if (dbTag && dbTag.userId === user.uid) {
      continue
    }

    throw new Error('Failed to associate tag')
  }
}

const mapTaskView = (task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
}