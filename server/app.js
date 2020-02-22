const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("./config/database");// TODO setup database
const mongoose = require("mongoose");
const router = require("./routes/index")
const api = require("./routes/api")
const subdomain = require('express-subdomain');// TODO create subdomain
const passport = require("passport");

//TODO i dont know what is this
const followRedirects = require("follow-redirects");
followRedirects.maxBodyLength = 100 * 1024 * 1024;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "build")));

app.use(passport.initialize());
app.use(passport.session());
// TODO setup database
mongoose.Promise = global.Promise;

mongoose
    .connect(config.database, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        () => console.log("[ Database =>] Connection to the database successful."),
        err => console.log("[ Database =>] The connection to the database failed.")
    );

//TODO setup session
app.use(
    session({
        secret: config.secret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 18000000
        } // ! auto delete after 5 hour
    })
);




// TODO setup subdomain, router

app.use(subdomain('api', api));
app.use("/", router)


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// TODO Web Template Studio: Add your own error handler here.
if (process.env.NODE_ENV === "production") {
    // Do not send stack trace of error message when in production
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send("Error occurred while handling the request.");
    });
} else {
    // Log stack trace of error message while in development
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        console.log(err);
        res.send(err.message);
    });
}

module.exports = app;
