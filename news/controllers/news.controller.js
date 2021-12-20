const config = require('../../common/config/env.config')
const axios = require('axios')

exports.fetchNews = async (req, res) => {
	let result = {}
	let keyword = req.query.search
	let API_key = config.news_api_key

	axios
		.get(`https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=${API_key}`)
		.then(response => {
			result.count = response.data.totalResults

			let data = []
			for (let i = 0; i < response.data.articles.length; i += 8) {
				let item = response.data.articles[i]
				data.push({
					headline: item.title,
					link: item.url,
				})
			}
			result.data = data
			console.log(result)

			res.status(200).json({
				status: 'OK',
				message: result,
			})
		})
		.catch(error => {
			return res.send(error)
		})
}
