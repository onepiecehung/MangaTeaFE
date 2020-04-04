const { Router } = require("express")
const router = new Router();
const StatusController = require("./status.controller")




router.route("/create")
    .post(
        StatusController.create
    );


module.exports = router
