const mongoose = require('mongoose');
const schemas = mongoose.Schema;


const UserSchema = new schemas({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true});


module.exports = mongoose.model('User', UserSchema);
