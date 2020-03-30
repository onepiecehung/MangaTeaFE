const { Router } = require("express")
const router = new Router();
const UserController = require("./user.controller")

// authen
// multer
// validation
// service


router.route('/register')
    .post(
        UserController.Register
    );

module.exports = router