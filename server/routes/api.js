const express = require("express");

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('[ ⇩ Subdomain ⇩ ] ⇨ Time request: ', new Date().toLocaleString())
    next()
})
//TODO this for test
const usersRouter = require("../apis/users/users.routes")
const genreRouter = require("../apis/genre/genre.routes")


router.use('/user', usersRouter);
router.use('/genre', genreRouter);


router.get('/', function (req, res) {
    res.send('Welcome to our API!');
});


module.exports = router;
