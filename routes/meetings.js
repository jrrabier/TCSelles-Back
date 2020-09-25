const express = require('express');
const router = express.Router();
const errorMsg = require('../assets/messages/error-messages.json');
const successMsg = require('../assets/messages/success-messages.json');
const infoMsg = require('../assets/messages/info-messages.json');

const Meetings = require('../models/meetings');

router.post('/add', (req, res) => {
    let newMeeting = req.body;
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let refDate = new Date(currentYear,8,1); // 01/09 de l'année en cours
    let season_years = "";

    if (currentDate < refDate) {
        season_years = (currentYear - 1).toString() + '/' + currentYear.toString();
    } else {
        season_years = currentYear.toString() + '/' + (currentYear + 1).toString();
    }

    newMeeting.season_years = season_years;

    Meetings.addMeeting(newMeeting, (err, meeting) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.meetingAlreadyExists})
        } else {
            res.status(200).json({success: true, msg: successMsg.meetingCreated})
        }
    });
});

router.get('/show', (req, res) => {

    Meetings.getAllMeetings((err, meetings) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError})
        } else {
            res.status(200).json({success: true, meetings})
        }
    });
});

router.post('/update', (req, res) => {
    let updatedMeeting = req.body;

    Meetings.updateMeeting(updatedMeeting, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, msg: successMsg.meetingUpdated});
        }
    });
});

router.get('/show/:home/:out/:cat/:date/:sex', (req, res) => {
    console.log(req.params);
    Meetings.getMeeting(req.params, (err, meeting) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, meeting});
        }
    });
});

module.exports = router;