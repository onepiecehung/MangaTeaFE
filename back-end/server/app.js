import createError from "http-errors";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import router from "./routes/index"
import api from "./api/api"
import subdomain from 'express-subdomain';// TODO create subdomain
import passport from "passport";
import {
    SERVER, DATABASE, API_PATH
} from "./config/constants";
import {
    MAX_TIME_SESSION
} from "../globalConstant/index"


import {
    createQueue, createWorkers
} from './connector/rabbitmq';
import {
    testAMQP
} from './connector/rabbitmq/__test__/__test__.worker';


createQueue().then(() => {
    setTimeout(() => {
        createWorkers(),
            testAMQP();
    }, 5000);
}).catch(error => {
    console.error('Error init rabbit : ', error);
});


const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());


// TODO setup database
mongoose.Promise = global.Promise;

mongoose
    .connect(DATABASE.URL_DB_LOCAL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        () => console.log(`[ Database =>] Connection to the database successful.
                            \n=> The APIs service running on port ${SERVER.PORT}
                            \n=> Document API: http://${API_PATH}.yourdomain.com/${SERVER.DOCS_PATH} or http://${SERVER.URL_API_HOST}:${SERVER.PORT}/${SERVER.DOCS_PATH}`),
        err => console.log("[ Database =>] The connection to the database failed.")
    );

//TODO setup session
app.use(
    session({
        secret: DATABASE.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: MAX_TIME_SESSION
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
