const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 's3cr3t'

const signToken = (userData) => {
	const token = jwt.sign({
		uid: userData.id,
		uem: userData.email,
	}, process.env.JWT_SECRET, { expiresIn: '1h'})


	return { token }
}

const isTokenValid = (token) => {
	if(!token) return null;

	const decoded =  jwt.verify(token.slice(7), process.env.JWT_SECRET, (err, decoded) => {
		if(err) {
			return null
		}

		return decoded
	});

	return decoded
}

module.exports = {
	signToken,
	isTokenValid
}