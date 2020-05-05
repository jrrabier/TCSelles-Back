const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: '/assets/avatars/default-avatar.png'
    },
    rank: {
        type: String,
        required: true
    },
    address: {
        street: String,
        postal_code: String,
        city: String
    },
    birth_date: {
        type: Date,
        required: true
    },
    mobile: {
        type: String
    },
    sex: {
        type: String,
        required: true
    },
    licence_number: String,
    role: {
        type: String,
        default: 'visitor',
        required: true 
    },
    pswToken: String
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getAllUsers = (callback) => {
    User.find({}, callback);
}

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByEmail = (email, callback) => {
    User.findOne({email: email}, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
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

