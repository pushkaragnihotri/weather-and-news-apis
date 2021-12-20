const NewsController = require('./controllers/news.controller')

module.exports = app => {
	app.get('/news', checkAuthorization, NewsController.fetchNews)
}
