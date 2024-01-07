const express = require('express');
const http = require('http');
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/', function (req, res) {
    if (req.accepts("html")) {
        res.sendFile(__dirname + "/public/index.html");
    } else if (req.accepts("json")) {
        res.json({message: "Backend Admin API reached, please make sure you know what you are doing"});
    } else {
        return res.sendStatus(404)
    }
});


const {connectDb} = require('./database/config');
connectDb().then(r => console.log(r)).catch(err => console.log(err));

const server = http.createServer(app);
Promise.resolve()
    .then(() => {
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
