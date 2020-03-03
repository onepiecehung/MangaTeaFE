var express = require('express');
var router = express.Router();

var genreController = require("./genre.controller")

router.post('/create', genreController.create);
router.post('/delete/:idGenre', genreController.delete);
router.put('/update/:idGenre', genreController.update);
router.get("/get-all-genre", genreController.getAllGenre)
router.get("/get-genre-by-id/:idGenre", genreController.getGenreById)


module.exports = router;