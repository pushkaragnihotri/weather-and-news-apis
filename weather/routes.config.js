const WeatherController = require('./controllers/weather.controller')

module.exports = app => {
	app.get('/weather', WeatherController.getWeatherForecast)
}
