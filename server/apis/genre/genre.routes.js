var express = require('express');
var router = express.Router();

var genreController = require("./genre.controller")

router.post('/create', genreController.create);


module.exports = router;