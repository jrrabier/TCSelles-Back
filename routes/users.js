const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const transporter = require('../services/emailService');

const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User(req.body);

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Echec à la création du User'});
        } else {
            res.json({success: true, msg: 'User enregistré'});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const login = req.body;

    User.getUserByEmail(login.email, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({success: false, msg: `Cet utilisateur n'existe pas`})    
        }

        User.comparePassword(login.password, user.password, (err, isMatch) => {
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
                        email: user.email,
                        avatar: user.avatar,
                        sex: user.sex
                    }
                });
            } else {
                return res.json({success: false, msg: 'Email ou mot de passe incorrect !'})  
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json(req.user);
});

router.route('/forgot-password')
    .post((req, res) => {
        const email = req.body.email;

        User.getUserByEmail(email, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                return res.json({success: false, msg: 'Cette adresse mail n\'est associée à aucun compte'})
            } else {
                let userId = user._id;
                const token = jwt.sign({userId}, user.password, {
                    expiresIn: 2 * 60 // 2 minutes
                });

                let mailOptions = {
                    from: '"Tennis Club Selles-sur-Cher" <jrmrabier@gmail.com>',
                    to: email,
                    subject: 'Test',
                    html: transporter.forgotPasswordTemplate(token)
                }
                transporter.sendMail(mailOptions, (err) => {
                    if (!err) {
                        return res.json({success: true, msg:'Un mail vient de vous être envoyé à l\'adresse fournie'});
                    } else {
                        return done(err);
                    }
                });
            }
        });
    });

router.route('/reset-password')
    .post(passport.authenticate('jwt', {session: false}), (req, res) => {

    })

module.exports = router;