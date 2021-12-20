const dotenv = require('dotenv')
dotenv.config()

module.exports = {
	env: process.env.ENV || 'dev',
	port: process.env.PORT || 3670,
	mongoUrl:
		process.env.MONGODB_URI ||
		process.env.MONGO_HOST ||
		'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || 27017) + '/mydb',
	jwt_secret: 'data_secret_2021',
	jwt_expiration_in_seconds: 36000,
	openweathermap_api_key: process.env.OPENWEATHERMAP_API_KEY,
	news_api_key: process.env.NEWS_API_KEY,
}
