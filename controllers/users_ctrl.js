const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const transporter = require('../services/emailService');
const validationServices = require('../services/validationServices');
const errorMsg = require('../assets/messages/error-messages.json');
const successMsg = require('../assets/messages/success-messages.json');
const infoMsg = require('../assets/messages/info-messages.json');
const mixinServices = require('../services/mixinServices')

const Users = require('../models/users');
const { getCategoryIdsByAge } = require('../models/categories');
const { addUserCategories } = require('../models/users_categories');
const { getAllLevels } = require('../models/levels');

// Register
router.route('/register')
.post((req, res, next) => {
    let newUser = req.body;
    let isMailValid = validationServices.isMailValid(newUser.mail);
    let age = mixinServices.getUserSeasonAge(newUser.birthdate);

    if (isMailValid) {
        // Control if mail doesn't exist already
        Users.isUserExist(newUser.mail).then(
            result => {
                if (result.length > 0) {
                    res.status(200).json({success: false, msg: errorMsg.mailExist});
                } else {
                    // Adding user as Promise because i need to be sure the user is added
                    // to get his id
                    Users.addUser(newUser).then(
                        result => {
                            if (!result) {
                                res.status(200).json({success: false, msg: errorMsg.accountNotCreated});
                            } else {
                                // Getting the user's id ...
                                Users.getUserByMail(newUser.mail, (err, user) => {
                                    if (err) {
                                        res.status(200).json({success: false, msg: errorMsg.generalError});
                                    } else {
                                        getCategoryIdsByAge(age, (err, result) => {
                                            if (result.length > 0) {
                                                let category_ids = result;
                                                // ... to create the users categories
                                                let usersCategories = mixinServices.generateUsersCategoriesToInsert(category_ids, user.id);
                                                usersCategories.forEach(category => {
                                                    addUserCategories(category, (err, result) => {
                                                        if (err) {
                                                            res.status(200).json({success: false, msg: errorMsg.generalError});
                                                        }
                                                    });
                                                });
                                                res.status(201).json({success: true, msg: successMsg.accountCreated});
                                            } else {
                                                res.status(200).json({success: false, msg: errorMsg.generalError});
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    );
                }
            }, reject => {
                res.status(200).json({success: false, msg: errorMsg.generalError});
            }
        )
    } else {
        res.status(200).json({success: false, msg: errorMsg.invalidMail});
    }
})
.get((req,res) => {
    getAllLevels((err,levels) => {
        if (err) {
            throw err;
        }
        if (levels) {
            return res.status(200).json({success: true, msg: successMsg.getAllLevels, levels});
        } else { 
            return res.status(200).json({success: false, msg: errorMsg.doesntGetAllLevels});
        }
    })
});

router.post('/authenticate', (req, res, next) => {
    const login = req.body;

    Users.getUserByMail(login.mail, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.status(200).json({success: false, msg: errorMsg.noAccount})    
        }

        Users.comparePassword(login.psw, user.psw, (err, isMatch) => {
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
                        id: user.id,
                        lastname: user.lastname,
                        firstname: user.firstname,
                        mail: user.mail,
                        avatar: user.avatar,
                        sex: user.sex
                    }
                });
            } else {
                return res.status(200).json({success: false, msg: errorMsg.incorrectLogin})  
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json(req.user);
});

router.post('/update', (req, res) => {
    let updatedUser = req.body;

    if (updatedUser.mail) {
        Users.getUserMailById(updatedUser.id, (err, mail) => {
            if (err) {
                throw err;
            }
            if (mail) {
                return res.status(200).json({success: false, msg: errorMsg.mailExist})  
            }
        });
    }

    if (updatedUser.psw) {
        mixinServices.validateAndHashPassword(updatedUser.psw, (err, hash) => {
            if (err) {
                res.status(200).json({success: false, msg: err.message});
            }
            updatedUser.psw = hash;

            Users.updateUser(updatedUser, (err, result) => {
                if (err) {
                    throw err;
                }
                return res.status(200).json({success: true, msg: successMsg.accountUpdated});
            });
        });
    } else {
        Users.updateUser(updatedUser, (err, result) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({success: true, msg: successMsg.accountUpdated});
        });
    }
});

router.route('/forgot-password')
    .post((req, res) => {
        const mail = req.body.mail;

        Users.getUserByMail(mail, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                return res.status(200).json({success: false, msg: errorMsg.noAccount})
            } else {
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 2 * 60 * 60 // 2 heures
                });

                let mailOptions = {
                    from: '"Tennis Club Selles-sur-Cher" <jrmrabier@gmail.com>',
                    to: mail,
                    subject: 'Test',
                    html: transporter.forgotPasswordTemplate(`Bearer ${token}`)
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if (!err) {
                        return res.status(200).json({success: true, msg: successMsg.emailSent});
                    } else {
                        return info;
                    }
                });
            }
        });
    });

router.route('/reset-password')
    .post(passport.authenticate('jwt', {session: false}), (req, res) => {
        let isSamePassword = req.body.newPsw === req.body.newPswConfirm;
        
        if (isSamePassword) {
            if (validationServices.isPasswordValid(req.body.newPsw)) {
                console.log(req.user, req.body);
                Users.updatePassword(req.user, req.body.newPsw, (err, doc) => {
                    if (err) {
                        throw err;
                    }
                    if (doc) {
                        return res.status(200).json({success: true, msg: successMsg.passwordUpdated})
                    }
                });
            } else {
                return res.status(200).json({success: false, msg: errorMsg.invalidPsw});
            }
        } else {
            return res.status(200).json({success: false, msg: infoMsg.samePassword});
        }
    });

router.post('/delete', (req, res) => {
    Users.deleteUser(req.id, (err, result) => {
        if (err) throw err;
        if (result) {
            return res.status(200).json({success: true, msg: successMsg.playerDeleted});
        }
    });
});

module.exports = router;