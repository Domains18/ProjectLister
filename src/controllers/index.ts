import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { authenticationPrecedure, generateRandomString } from 'functions/authentication';
import { findUsers, findUserByEmail, findUserByToken, defineUser, deleteUser, updateUser } from 'models'



export const registerUser = expressAsyncHandler(async (req: express.Request, res: express.Response) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) { res.sendStatus(409) }
    const isRegistered = await findUserByEmail(email);
    if (isRegistered) { res.sendStatus(400).json('duplicate') }

    const salt = generateRandomString()
    const user = await defineUser({
        email,
        username,
        password: authenticationPrecedure(salt, password)
    });
    user ? res.status(200).json(user) : res.sendStatus(403);
});


export const loginUser = expressAsyncHandler(async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    if (!email || !password) { res.sendStatus(403) };

    const isUser = await findUserByEmail(email).select('+authentication.salt +authentication.password')
    if (!isUser) { res.sendStatus(404) };

    const expectedHash = authenticationPrecedure(isUser.authentication.salt, password);

    if (isUser.authentication.password !== expectedHash) {
        res.sendStatus(403);
    }

    //update the sessionToken 
    const salt = generateRandomString();
    isUser.authentication.token = authenticationPrecedure(salt, isUser._id.toString());
    await isUser.save();

    res.cookie('user_cookie', isUser.authentication.token, { domain: 'localhost', path: '/' });
    res.status(200).json(isUser).end();

})
