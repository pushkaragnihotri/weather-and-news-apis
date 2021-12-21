const NewsController = require('./controllers/news.controller');
const checkAuthorization = require('../common/middlewares/auth.middleware');

module.exports = (app) => {
  app.get('/news', checkAuthorization, NewsController.fetchNews);
};
