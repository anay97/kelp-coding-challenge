require('dotenv').config();
var express = require('express');
var router = express.Router();
const { processCSVRoute, reportRoute, reportPageRoute } = require('./csvToJSONRoutes');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* GET about page. */
router.get('/about', function (req, res, next) {
  res.render('about');
});

router.get('/csv-to-json', processCSVRoute);
router.get('/report', reportPageRoute);


router.post('/api/report', reportRoute);

module.exports = router;
