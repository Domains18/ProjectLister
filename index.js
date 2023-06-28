require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { AppErrorHandler, lostErrorHandler } = require('./config/exceptionHandlers/handler');
const corsOptions = require('./config/cors/cors');
const CustomError = require('./config/errors/CustomError');

const app = express();
const port = process.env.PORT || 5000;


// Middleware and customizations
app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//successful test
app.get("/", (req, res) => {
    res.send("successful request")
});

//crash test
app.get('/def', function (req, res, next) {
    try {
        throw new CustomError(" status of 400", 400);
    } catch (error) {
        res.status(500);
        next(error)
    }
});


//error handlers
app.all("*", function (req, res, next) {
    next()
});
app.use(lostErrorHandler);
app.use(AppErrorHandler);
app.on('ready', () => {
    app.listen(port, () => {
        console.log(`App running on port ${port}`)
    });
});
