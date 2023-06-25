const allowList = ["http://localhost:3000", "http://localhost:8000"];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowList.includes(origin)) {
            callback(bull, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    exposedHandlers: ["WWW-Authentication"]
};

module.exports = corsOptions;
