const nodemailer = require("nodemailer");

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

module.exports.forgotPasswordTemplate = (token) => {
    return `<h3>Mot de passe oublié ?</h3>
    <a href="http://localhost:4200/forgot-password?token=${token}">Changer mon mot de passe</a>`
}