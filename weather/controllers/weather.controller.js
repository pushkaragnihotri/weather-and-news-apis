const config = require('../../common/config/env.config')
const axios = require('axios')

exports.getWeatherForecast = async (req, res) => {
	let result = {}
	let city = req.query.city || 'Bangalore'
	let unit = req.query.unit || 'metric'
	let API_key = config.openweathermap_api_key

	axios
		.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_key}`)
		.then(response => {
			result.count = 5
			result.unit = unit
			result.location = city

			let data = []
			for (let i = 0; i < response.data.list.length; i += 8) {
				let item = response.data.list[i]
				data.push({
					date: new Date(item.dt_txt).toDateString(),
					main: item.weather[0].main,
					temp: item.main.temp,
				})
			}
			result.data = data

			res.status(200).json({
				status: 'OK',
				message: result,
			})
		})
		.catch(error => {
			return res.send(error)
		})
}
