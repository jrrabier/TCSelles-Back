const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

const User = require('../models/user')

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        rank: req.body.rank,
        adress: req.body.adress,
        postal_code: req.body.postal_code,
        city: req.body.city,
        birth_date: req.body.birth_date,
        mobile: req.body.mobile,
        sex: req.body.sex,
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Echec à la création du User'});
        } else {
            res.json({success: true, msg: 'User enregistré'});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({success: false, msg: `Cet utilisateur n'existe pas`})    
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            if (isMatch) {
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 604800 // 1 semaine
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        last_name: user.last_name,
                        first_name: user.first_name,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Mauvais mot de passe'})  
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res) {
    res.json({user: req.user});
});

module.exports = router;