const express = require('express');
const router = express.Router();
const errorMsg = require('../assets/messages/error-messages.json');
const successMsg = require('../assets/messages/success-messages.json');

const Comments = require('../models/comments');

router.post('/add', (req, res) => {
    let newComment = req.body;

    Comments.addComment(newComment, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: err});
        } else {
            res.status(201).json({success: true, msg: successMsg.commentCreated});
        }
    });
});

router.get('/show', (req, res) => {

    Comments.getAllComments((err, comments) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, comments});
        }
    });
});

router.get('/show/:id', (req, res) => {
    let id = req.params.id;

    Comments.getComment(id, (err, comment) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, comment});
        }
    });
});

router.post('/update', (req, res) => {
    let updatedComment = req.body;

    Comments.updateComment(updatedComment, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, msg: successMsg.commentUpdated});
        } 
    });
});

router.post('/delete', (req, res) => {
    let commentId = req.body.id;

    Comments.deleteComment(commentId, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, msg: successMsg.commentDeleted});
        }
    });
});

module.exports = router;