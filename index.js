require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;


// Middleware and customizations
app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.on('ready', () => {
    app.listen(port, () => {
        console.log(`App running on port ${port}`)
    });
});
