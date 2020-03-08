const express = require("express");

const router = express.Router();
const swaggerSpec = require('../bin/docs');
const swaggerUI = require("swagger-ui-express");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('[ ⇩ Subdomain ⇩ ] ⇨ Time request: ', new Date().toLocaleString() + " from the APIs web service")
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

// TODO api document
// app.use('/documents', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.use('/documents', swaggerUI.serve);
router.get('/documents', swaggerUI.setup(swaggerSpec));


module.exports = router;
