const { User } = require('../models');
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
  try {
    const body = req.body;
    const userData = hashUserPassword(body)

    const user = await User.create(userData, { returning: ['id', 'name', 'email']});
    const userView = mapUserView(user)
    return res.status(201).json(userView);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const hashUserPassword = (userData) => {
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(userData.password, salt);
  userData.password = passwordHash

  return userData;
}

const mapUserView = (user) => {
  return { 
    id: user.id,
    name: user.name,
    email: user.email
   }
}


module.exports = {
  createUser,
  getUserById,
}