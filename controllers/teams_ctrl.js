const express = require('express');
const router = express.Router();
const errorMsg = require('../assets/messages/error-messages.json');
const successMsg = require('../assets/messages/success-messages.json');

const Teams = require('../models/teams');
const { isUserExist } = require('../models/users');

router.post('/add', (req, res) => {
    let newTeam = req.body;

    Teams.isTeamExist(newTeam).then(
        result => {
            if (result.length > 0) {
                res.status(200).json({success: false, msg: errorMsg.teamAlreadyExists, team: result});
            } else {
                Teams.addTeam(newTeam, (err, result) => {
                    if (err) {
                        res.status(200).json({success: false, msg: err});
                    } else {
                        res.status(201).json({success: true, msg: successMsg.teamCreated});
                    }
                });
            }
        }
    );
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