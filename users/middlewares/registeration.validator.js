const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

validateRegistrationParams = (req, res, next) => {
	let error = null
	if (!req.body.email || req.body.email.length == 0) {
		error = 'Email cannot be empty'
	} else if (!req.body.password || req.body.password.length == 0) {
		error = 'Passowrd cannot be empty'
	} else if (!req.body.email.match(emailFormat)) {
		error = 'Invalid email format'
	} else if (!req.body.name || req.body.name.length == 0) {
		error = 'Name cannot be empty'
	}
	if (error)
		return res.status(400).json({
			status: 'Bad Request',
			message: error,
		})
	else next()
}

module.exports = validateRegistrationParams
