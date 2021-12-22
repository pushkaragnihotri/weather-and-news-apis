const axios = require('axios');
const config = require('../../common/config/env.config');

exports.fetchNews = async (req, res) => {
  const result = {};
  const keyword = req.query.search;
  const APIKey = config.newsAPIKey;

  axios
    .get(`https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=${APIKey}`)
    .then((response) => {
      result.count = response.data.totalResults;

      const data = [];
      for (let i = 0; i < response.data.articles.length; i += 1) {
        const item = response.data.articles[i];
        data.push({
          headline: item.title,
          link: item.url,
        });
      }
      result.data = data;

      res.status(200).json({
        status: 'OK',
        message: result,
      });
    })
    .catch((error) => res.send(error));
};
