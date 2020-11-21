const express = require('express');
const router = express.Router();
const errorMsg = require('../assets/messages/error-messages.json');
const successMsg = require('../assets/messages/success-messages.json');

const Availabilities = require('../models/availabilities');

/**
 * Route to add OR update a user's availability to a meeting
 */
router.post('/add', (req, res) => {
    let newAvailability = req.body;

    // On contrôle que la rencontre n'existe pas déjà
    Availabilities.isAvailabilityExist(newAvailability).then(
        result => {
            if (result.length > 0) {
                Availabilities.updateAvailability(newAvailability, (err, result) => {
                    if (err) {
                        res.status(200).json({success: false, msg: errorMsg.generalError});
                    } else {
                        res.status(200).json({success: true, msg: successMsg.availabilityUpdated});
                    }
                });
            } else {
                Availabilities.addAvailability(newAvailability, (err, result) => {
                    if (err) {
                        res.status(200).json({success: false, msg: err});
                    } else {
                        res.status(201).json({success: true, msg: successMsg.availabilityCreated});
                    }
                });
            }
        }
    );
});

router.get('/show', (req, res) => {

    Availabilities.getAllAvailabilities((err, availabilities) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, availabilities});
        }
    });
});

router.get('/show/:u_id/:m_id', (req, res) => {

    Availabilities.getAvailabilityById(req.params, (err, availability) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, availability});
        }
    });
});

module.exports = router;