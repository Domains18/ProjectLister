const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');


const registerUser = asyncHandler(async (req, res) => {
    const {userName, email, password} = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        console.error('Invalid user data');
    }

    const validateUser = await User.findOne({email});
    res.status = (number) => {
    };
    if (validateUser) {
        res.status(400);
        console.error('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({userName, email, password: hashedPassword});
    if (user) {
        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            token: jwt.sign({id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '30d',
            }),
        })
    } else {
        res.status(400);
        console.error('Invalid user data');
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            token: jwt.sign({id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '30d',
            }),
        });
    } else {
        res.status(401);
        console.error('Invalid email or password');
    }
});
