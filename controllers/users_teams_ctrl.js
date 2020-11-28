const express = require('express');
const router = express.Router();
const errorMsg = require('../assets/messages/error-messages.json');
const successMsg = require('../assets/messages/success-messages.json');

const UsersTeams = require('../models/users_teams');
const { getTeamSexAndCatById } = require('../models/teams');
const { getUserSexAndCatById } = require('../models/users');

router.post('/add', (req, res) => {
    let newUsersTeam = req.body;

    let isUserAlreadyBelongsToTeam = UsersTeams.isUserAlreadyBelongsToTeam(newUsersTeam);
    let userSexAndCat = getUserSexAndCatById(newUsersTeam.users_id);
    let teamSexAndCat = getTeamSexAndCatById(newUsersTeam.teams_id);

    Promise.all([userSexAndCat, teamSexAndCat]).then(
        results => {
            let userResult = results[0];
            let teamResult = results[1];
            let canJoinTeam = false;

            userResult.forEach(userSexAndCat => {
                if (userSexAndCat.sex == teamResult.sex && userSexAndCat.categories_id == teamResult.categories_id) {
                    canJoinTeam = true;
                };
            });
            if (canJoinTeam) {
                isUserAlreadyBelongsToTeam.then(
                    result => {
                        if (result) {
                            res.status(200).json({success: false, msg: errorMsg.userAlreadyBelongsToTeam});
                        } else {
                            UsersTeams.isUserBelongsToOtherSameCatTeam(teamResult,newUsersTeam.users_id).then(
                                team => {
                                    if (team) {
                                        res.status(200).json({success: false, msg: errorMsg.userAlreadyBelongsToOtherSameCatTeam});
                                    } else {
                                        UsersTeams.addUsersTeam(newUsersTeam, (err, result) => {
                                            if (err) {
                                                console.log(err);
                                                res.status(200).json({success: false, msg: errorMsg.generalError});
                                            } else {
                                                res.status(201).json({success: true, msg: successMsg.usersTeamsCreated});
                                            }
                                        });
                                    }
                                }
                            )
                        }
                    
                    }
                )
            } else {
                res.status(200).json({success: false, msg: errorMsg.wrongCategory});
            }
        }
    )

    // UsersTeams.isUsersTeamExist(newUsersTeam).then(
    //     result => {
    //         if (result.length > 0 && newUsersTeam.users_id) {
    //             res.status(200).json({success: false, msg: errorMsg.teamAlreadyExists, team: result});
    //         } else {
    //             UsersTeams.addTeam(newUsersTeam, (err, result) => {
    //                 if (err) {
    //                     res.status(200).json({success: false, msg: err});
    //                 } else {
    //                     res.status(201).json({success: true, msg: successMsg.teamCreated});
    //                 }
    //             });
    //         }
    //     }
    // );
});

router.get('/show', (req, res) => {

    Teams.getAllTeams((err, teams) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, teams});
        }
    });
});

router.get('/show/:id', (req, res) => {
    let id = req.params.id;

    Teams.getTeam(id, (err, team) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, team});
        }
    });

});

router.post('/update', (req, res) => {
    let updatedTeam = req.body;

    Teams.updateTeam(updatedTeam, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, msg: successMsg.teamUpdated});
        }
    });
});

router.post('/delete', (req, res) => {
    let teamId = req.body.id;

    Teams.deleteTeam(teamId, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, msg: successMsg.teamDeleted});
        }
    });
});

module.exports = router;