const validationService = require('./validationService')
const bcrypt = require('bcryptjs');
const errorMsg = require('../assets/messages/error-messages.json')

module.exports.validateAndHashPassword = (password, callback) => {
    var isValidPassword = validationService.isPasswordValid(password);

    if (isValidPassword) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
                callback(null, hash);
            });
        });
    } else {
        callback(new Error(errorMsg.invalidPsw))
    }
}