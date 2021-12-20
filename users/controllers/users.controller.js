const UserModel = require('../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../common/config/env.config')
const saltRounds = 10

exports.register = async (req, res) => {
	const { email, password } = req.body
	const existingUsers = await UserModel.findOne({ email })
	if (existingUsers)
		return res.status(409).json({
			status: 'Conflict',
			message: `Registration failed. Email is already registered!`,
		})

	try {
		const encryptedPassword = await bcrypt.hash(password, saltRounds)
		const result = await UserModel.create({ ...req.body, password: encryptedPassword })
		return res.status(201).json({
			status: 'Created',
			message: 'User created successfully!',
			id: result._id,
		})
	} catch (e) {
		return res.status(500).json({
			status: 'Internal Server Error',
			message: `Password encryption failed: ${e}`,
		})
	}
}

exports.login = async (req, res) => {
	const { email, password } = req.body
	const user = await UserModel.findOne({ email })
	if (!user)
		return res.status(404).json({
			status: 'Not Found',
			message: `Authenticated failed. User not found!`,
		})

	const isCorrectPassword = await bcrypt.compare(password, user.password)
	if (!isCorrectPassword)
		return res.status(401).json({
			status: 'Unauthorized',
			message: `Authentication failed. Wrong password!`,
		})

	const payload = { email }
	const secret = config.jwt_secret
	const expiresIn = config.jwt_expiration_in_seconds
	const token = jwt.sign(payload, secret, { expiresIn })
	res.cookie('accessToken', token)
	return res.status(200).json({
		status: 'OK',
		message: 'User authentication successfull!',
		// accessToken: token,
	})
}

exports.logout = async (req, res) => {
	res.cookie('accessToken', null)
	return res.status(200).json({
		status: 'OK',
		message: 'User logout successfully',
	})
}
