const bcrypt = require('bcryptjs');
const errorMsg = require('../assets/messages/error-messages.json');

module.exports.getAllUsers = (callback) => {
    let req = 'SELECT * FROM tennisclub.users';
    connection.query(req, (err, results) => {
            if (err) {
                callback(err);
            }
        callback(null, results);
    });
}

module.exports.getUserById = (id, callback) => {
    let req = 'SELECT id, mail, lastname, firstname, birthdate, phone, avatar, address, postalcode, city, licence_nb, levels_id, sex ' + 
    'FROM tennisclub.users ' +
    'WHERE id = ?';

    connection.query(req, id, (err, results) => {
        if (err) {
            callback(err);
        }
        callback(null, results);
    });
}

module.exports.getUserMailById = (id, callback) => {
    let req = 'SELECT mail FROM tennisclub.users WHERE id = ?';
    connection.query(req, id, (err, mail) => {
            if (err) {
                callback(err);
            }
        callback(null, mail);
    });
}

module.exports.getUserByMail = (email, callback) => {
    let req = 'SELECT * FROM tennisclub.users WHERE mail = ?';
    connection.query(req, [email], (err, results) => {
            if (err) {
                callback(err);
            }
        callback(null, results[0]);
    });
}

// module.exports.getSessionUserByMail = (email, callback) => {
//     let req = 'SELECT id, firstname, lastname, mail, avatar, psw, sex ' +
//     'FROM tennisclub.users ' +
//     'WHERE mail = ?';
//     connection.query(req, [email], (err, results) => {
//             if (err) {
//                 callback(err);
//             }
//         callback(null, results[0]);
//     });
// }

module.exports.addUser = (newUser) => {
    return new Promise((resolve, reject) => {
        newUser.psw = bcrypt.hashSync(newUser.psw, 10);
        let req = 'INSERT INTO tennisclub.users SET ?';
        connection.query(req, newUser, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

module.exports.updateUser = (updatedUser, callback) => {
    let req = 'UPDATE tennisclub.users SET ? WHERE id = ?';

    connection.query(req, [updatedUser, updatedUser.id], (err, results) => {
        if (err) {
            callback(err);
        }
        console.log(results);
        callback(null, results);
    });
}

module.exports.deleteUser = (id, callback) => {
    let req = 'DELETE FROM tennisclub.users WHERE id = ?';

    connection.query(req, id, (err, results) => {
        if (err) {
            callback(err);
        }
        console.log(results);
        callback(null, results);
    });
}

module.exports.comparePassword = (candidatePassword, hash) => {
    return bcrypt.compareSync(candidatePassword, hash);
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
        let req = 'SELECT mail FROM tennisclub.users WHERE mail=?';
    
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
        let req = 'SELECT sex, uc.categories_id FROM tennisclub.users ' +
            'INNER JOIN tennisclub.users_categories uc ON id = uc.users_id ' +
            'WHERE id=?';

        connection.query(req, id, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

