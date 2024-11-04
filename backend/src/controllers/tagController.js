const { Tag } = require('../models');

const createTag = async (req, res) => {
  try {
    const body = req.body;

    const tag = await Tag.create(body);
    return res.status(201).json(tag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (tag) {
      return res.status(200).json(tag);
    } else {
      return res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateTag = async (req, res) => {
  try {
    const body = req.body;
    const tag = await Tag.findByPk(req.params.id);

    if (tag) {
      await tag.update(body);
      await tag.reload();

      return res.status(200).json(tag);
    } else {
      return res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (tag) {
      await tag.destroy();
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
}