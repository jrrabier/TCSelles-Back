const express = require('express');
const router = express.Router();
const errorMsg = require('../assets/messages/error-messages.json');
const successMsg = require('../assets/messages/success-messages.json');

const ArticlesCategories = require('../models/articles_categories');

router.get('/', (req, res) => {

    ArticlesCategories.getAllArticlesCategories((err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, result});
        }
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    ArticlesCategories.getAllArticlesByCategory(id, (err, result) => {
        if (err) {
            res.status(200).json({success: false, msg: errorMsg.generalError});
        } else {
            res.status(200).json({success: true, result});
        }
    });
});

module.exports = router;