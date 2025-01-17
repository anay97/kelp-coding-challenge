var express = require('express');
var router = express.Router();
const { getFilePath } = require('../services/fileService');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' + getFilePath() });
});

module.exports = router;
