const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

//CORS- ISSUE SORTED
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/', async (req, res) => {
  url = 'https://www.ifsc-climbing.org/athlete/13040/sorato-anraku';
  var data = await new Promise((resolve, reject) => {
    request(url, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);
        var climber = $('h2.d3-ty-heading-2').text();
        resolve(climber);
      }
    });
  });
  res.send(data);
});

app.listen(process.env.PORT || 5000);

console.log('API is running on http://localhost:8000');

module.exports = app;
