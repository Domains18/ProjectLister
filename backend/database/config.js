const mongoose = require('mongoose');


async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err);
    }
};


module.exports = {connectDb};
