import crypto from 'crypto'
const secret = 'something+secret'


export const generateRandomString = () => crypto.randomBytes(128).toString('utf16le');
export const authenticationPrecedure = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex');
}


