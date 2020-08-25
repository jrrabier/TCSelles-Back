const bcrypt = require('bcryptjs');

module.exports.getAllUsers = (callback) => {
    User.find({}, callback);
}

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByEmail = (email, callback) => {
    var req = '';
}

module.exports.addUser = (newUser, callback) => {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.psw, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.psw = hash;

            var req = 'INSERT INTO user SET ?';
            connection.query(req, newUser, (err, result, fields) => {
                if (err) throw err;
                console.log(result);
                callback(null, result);
            });
        });
    });
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw err;
        }
        callback(null, isMatch);
    });
}

module.exports.updatePassword = (user, newPassword, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            user.password = hash;
            user.save(callback);
        });
    });
}

