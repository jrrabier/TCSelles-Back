const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');

// create reusable transporter object using the default SMTP transport
transporter = module.exports = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'jrmrabier@gmail.com',
        pass: '19jerome86'
    }
});

module.exports.forgotPasswordTemplate = () => {
    fs.readFile(path.join(__dirname, '../assets/email-templates/forgot-password.html'), 'utf8', (err, content) => {
        if (err) {
            throw err;
        } else {
            return content.toString();
        }
    });
}