const axios = require('axios');
const config = require('../../common/config/env.config');

exports.getWeatherForecast = async (req, res) => {
  const result = {};
  const city = req.query.city || 'Bangalore';
  const unit = req.query.unit || 'metric';
  const APIKey = config.openweathermap_api_key;

  axios
    .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${APIKey}`)
    .then((response) => {
      result.count = 5;
      result.unit = unit;
      result.location = city;

      const data = [];
      for (let i = 0; i < response.data.list.length; i += 8) {
        const item = response.data.list[i];
        data.push({
          date: new Date(item.dt_txt).toDateString(),
          main: item.weather[0].main,
          temp: item.main.temp,
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
