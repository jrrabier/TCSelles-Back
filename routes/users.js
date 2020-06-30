const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const transporter = require('../services/emailService');
const validationService = require('../services/validationService')

const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User(req.body);

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.status(200).json({success: false, msg: 'Echec à la création du User'});
        } else {
            res.status(201).json({success: true, msg: 'User enregistré'});
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
            return res.status(200).json({success: false, msg: `Cet utilisateur n'existe pas`})    
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
                return res.status(200).json({success: false, msg: 'Email ou mot de passe incorrect !'})  
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
                return res.status(200).json({success: false, msg: 'Cette adresse mail n\'est associée à aucun compte'})
            } else {
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 2 * 60 * 60 // 2 heures
                });

                let mailOptions = {
                    from: '"Tennis Club Selles-sur-Cher" <jrmrabier@gmail.com>',
                    to: email,
                    subject: 'Test',
                    html: transporter.forgotPasswordTemplate(`Bearer ${token}`)
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if (!err) {
                        return res.status(200).json({success: true, msg:'Un mail vient de vous être envoyé à l\'adresse fournie'});
                    } else {
                        return info;
                    }
                });
            }
        });
    })

router.route('/reset-password')
    .post(passport.authenticate('jwt', {session: false}), (req, res) => {
        let isSamePassword = req.body.newPsw === req.body.newPswConfirm;
        console.log(isSamePassword);
        
        if (isSamePassword) {
            if (validationService.isPasswordValid(req.body.newPsw)) {
                console.log(req.user, req.body);
                User.updatePassword(req.user, req.body.newPsw, (err, doc) => {
                    if (err) {
                        throw err;
                    }
                    if (doc) {
                        return res.status(200).json({success: true, msg: `Votre mot de passe a bien été mis à jour`})
                    }
                });
            } else {
                return res.status(200).json({success: false, msg:`Votre mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un caractère spécial (@$!%*#?&)`});
            }
        } else {
            return res.status(200).json({success: false, msg:`Les deux mots de passe doivent être identiques`});
        }
    })

module.exports = router;