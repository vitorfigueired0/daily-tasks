const { User } = require('../models')
const { signToken, isTokenValid } = require('../util/jwt')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
	const errorMsg = 'Wrong email or password'

  try {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } });

		if(!user) {
			return res.status(404).json({ error: errorMsg })
		}

		if(!bcrypt.compareSync(password, user.password)) {
			return res.status(404).json({ error: errorMsg })
		}

		const token = signToken(user)
		return res.status(200).json(token)

	} catch (error) {
		return res.status(404).json({ error: errorMsg })
	}
}

module.exports = { login }