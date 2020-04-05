const { Router } = require("express")
const router = new Router();
const GenreController = require("./genre.controller")




router.route("/all")
    .post(
        GenreController.autoCreateAllGenre
    )

module.exports = router
