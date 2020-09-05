const bcrypt = require('bcryptjs');
const errorMsg = require('../assets/messages/error-messages.json')

module.exports.getAllUsers = (callback) => {
    var req = 'SELECT * FROM users';
    connection.query(req, (err, results) => {
            if (err) {
                throw err;
            }
        callback(null, results);
    });
}

module.exports.getUserById = (id, callback) => {
    var req = 'SELECT id, mail, lastname, firstname, birthdate, phone, avatar, address, postalcode, city, licence_nb, lvl_id, sex_id, club_id ' + 
    'FROM users ' +
    'WHERE id = ?';

    connection.query(req, id, (err, results) => {
        if (err) {
            throw err;
        }
        callback(null, results);
    });
}

module.exports.getUserMailById = (id, callback) => {
    var req = 'SELECT mail FROM users WHERE id = ?';
    connection.query(req, id, (err, mail) => {
            if (err) {
                throw err;
            }
        callback(null, mail);
    });
}

module.exports.getUserByMail = (mail, callback) => {
    var req = 'SELECT * FROM users WHERE mail = ?';
    connection.query(req, mail, (err, results) => {
            if (err) {
                throw err;
            }
        callback(null, results[0]);
    });
}

module.exports.addUser = (newUser, callback) => {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.psw, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.psw = hash;

            var req = 'INSERT INTO users SET ?';
            connection.query(req, newUser, (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results);
                callback(null, results);
            });
        });
    });
}

module.exports.updateUser = (updatedUser, callback) => {
    var req = 'UPDATE users SET ? WHERE id = ?';

    connection.query(req, [updatedUser, updatedUser.id], (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        callback(null, results);
    });
}

module.exports.deleteUser = (id, callback) => {
    var req = 'DELETE FROM users WHERE id = ?';

    connection.query(req, id, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        callback(null, results);
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

