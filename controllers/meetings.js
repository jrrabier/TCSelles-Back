const express = require('express');
const router = express.Router();
const errorMsg = require('../assets/messages/error-messages.json');
const successMsg = require('../assets/messages/success-messages.json');

const Meetings = require('../models/meetings');

router.post('/add', (req, res) => {
    let newMeeting = req.body;
    
    // On contrôle que la rencontre n'existe pas déjà
    Meetings.isMeetingExist(newMeeting).then(
        result => {
            if (result.length > 0) {
                res.status(200).json({success: false, msg: errorMsg.meetingAlreadyExists, data: result})
            } else {
                Meetings.addMeeting(newMeeting, (err, result) => {
                    if (err) {
                        res.status(200).json({success: false, msg: err});
                    } else {
                        res.status(201).json({success: true, msg: successMsg.meetingCreated});
                    }
                });
            }
        }
    );
});

router.get('/show', (req, res) => {

    Meetings.getAllMeetings((err, meetings) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, meetings});
        }
    });
});

router.post('/update', (req, res) => {
    let updatedMeeting = req.body;

    Meetings.updateMeeting(updatedMeeting, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else if (result.affectedRows > 0){
            res.status(200).json({success: true, msg: successMsg.meetingUpdated});
        } else {
            res.status(200).json({success: false, msg: errorMsg.meetingDoesntExist});
        }
    });
});

router.get('/show/:id', (req, res) => {
    let id = req.params.id;

    Meetings.getMeeting(id, (err, meeting) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, meeting});
        }
    });
});

router.post('/delete', (req, res) => {
    let meetingId = req.body.id;

    Meetings.deleteMeeting(meetingId, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else if (result.affectedRows > 0){
            res.status(200).json({success: true, msg: successMsg.meetingDeleted});
        } else {
            res.status(200).json({success: false, msg: errorMsg.meetingDoesntExist});
        }
    });
});

module.exports = router;