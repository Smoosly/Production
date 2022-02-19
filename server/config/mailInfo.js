const nodeMailer = require('nodemailer');
const inlineCss = require('nodemailer-juice');
const smtpTransport = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
        user: "smoosly23@gmail.com",
        pass: "tmantmffl23!"
    },
    tls: {
        rejectUnauthorized: false
    }
});
smtpTransport.use('compile', inlineCss());
module.exports = smtpTransport;