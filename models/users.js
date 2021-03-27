const bcrypt = require('bcryptjs');
const errorMsg = require('../assets/messages/error-messages.json')

module.exports.getAllUsers = (callback) => {
    let req = 'SELECT * FROM tcselles.users';
    connection.query(req, (err, results) => {
            if (err) {
                callback(err);
            }
        callback(null, results);
    });
}

module.exports.getUserById = (id, callback) => {
    let req = 'SELECT id, mail, lastname, firstname, birthdate, phone, avatar, address, postalcode, city, licence_nb, levels_id, sex ' + 
    'FROM tcselles.users ' +
    'WHERE id = ?';

    connection.query(req, id, (err, results) => {
        if (err) {
            callback(err);
        }
        callback(null, results);
    });
}

module.exports.getUserMailById = (id, callback) => {
    let req = 'SELECT mail FROM tcselles.users WHERE id = ?';
    connection.query(req, id, (err, mail) => {
            if (err) {
                callback(err);
            }
        callback(null, mail);
    });
}

module.exports.getUserByMail = (mail, callback) => {
    let req = 'SELECT * FROM tcselles.users WHERE mail = ?';
    connection.query(req, [mail], (err, results) => {
            if (err) {
                callback(err);
            }
        callback(null, results[0]);
    });
}

module.exports.addUser = (newUser) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.psw, salt, (err, hash) => {
                if (err) {
                    callback(err);
                }
                newUser.psw = hash;
    
                let req = 'INSERT INTO tcselles.users SET ?';
                connection.query(req, newUser, (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                });
            });
        });
    })
}

module.exports.updateUser = (updatedUser, callback) => {
    let req = 'UPDATE tcselles.users SET ? WHERE id = ?';

    connection.query(req, [updatedUser, updatedUser.id], (err, results) => {
        if (err) {
            callback(err);
        }
        console.log(results);
        callback(null, results);
    });
}

module.exports.deleteUser = (id, callback) => {
    let req = 'DELETE FROM tcselles.users WHERE id = ?';

    connection.query(req, id, (err, results) => {
        if (err) {
            callback(err);
        }
        console.log(results);
        callback(null, results);
    });
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            callback(err);
        }
        callback(null, isMatch);
    });
}

module.exports.updatePassword = (user, newPassword, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) {
                callback(err);
            }
            user.password = hash;
            user.save(callback);
        });
    });
}

module.exports.isUserExist = (mail) => {
    return new Promise((resolve, reject) => {
        let req = 'SELECT mail FROM tcselles.users WHERE mail=?';
    
        connection.query(req, mail, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

module.exports.getUserSexAndCatById = (id) => {
    return new Promise((resolve, reject) => {
        let req = 'SELECT sex, uc.categories_id FROM tcselles.users ' +
            'INNER JOIN tcselles.users_categories uc ON id = uc.users_id ' +
            'WHERE id=?';

        connection.query(req, id, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

