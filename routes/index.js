require('dotenv').config();
var express = require('express');
var router = express.Router();
const { processCSVRoute, requestHandlerRoute } = require('./csvToJSONRoutes');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/csv-to-json', processCSVRoute);
router.get('/csv-to-json2', requestHandlerRoute);

module.exports = router;
