const express = require('express');
const router = express.Router();
const errorMsg = require('../assets/messages/error-messages.json');
const successMsg = require('../assets/messages/success-messages.json');

const Articles = require('../models/articles');
const { getCommentsByArticle } = require('../models/comments');

router.post('/add', (req, res) => {
    let newArticle = req.body;

    Articles.addArticle(newArticle, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: err});
        } else {
            res.status(201).json({success: true, msg: successMsg.articleCreated});
        }
    });
});

router.get('/show', (req, res) => {

    Articles.getAllArticles((err, articles) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, articles});
        }
    });
});

router.get('/show/:id', (req, res) => {
    let id = req.params.id;

    if (id === '0') {
        Articles.getAllArticles((err, articles) => {
            if (err) {
                res.status(200).json({success: false, msg: errorMsg.generalError});
            } else {
                res.status(200).json({success: true, articles});
            }
        });
    } else {
        Articles.getArticle(id, (err, article) => {
            if (err) {
                res.status(200).json({success: false, msg: errorMsg.generalError});
            } else {
                getCommentsByArticle(id, (err, comments) => {
                    if (err) {
                        res.status(200).json({success: false, msg: errorMsg.generalError});
                    } else {
                        res.status(200).json({success: true, article, comments});
                    }
                });
            }
        });
    }


});

router.post('/update', (req, res) => {
    let updatedArticle = req.body;

    Articles.updateArticle(updatedArticle, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, msg: successMsg.articleUpdated});
        } 
    });
});

router.post('/delete', (req, res) => {
    let articleId = req.body.id;

    Articles.deleteArticle(articleId, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, msg: successMsg.articleDeleted});
        }
    });
});

module.exports = router;