
const main = require('./email.service');

const fixedMailOptions = {
    from: process.env.EMAIL_FROM,
};

function sendMail(options = {}) {
    const mailOptions = Object.assign({}, options, fixedMailOptions);
    return main(mailOptions);
}


module.exports = sendMail;
