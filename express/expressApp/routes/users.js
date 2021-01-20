var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/chen', function(req, res, next) {
  res.send('test chen');
});

module.exports = router;
