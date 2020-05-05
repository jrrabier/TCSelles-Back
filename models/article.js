const mongoose = require('mongoose');
const User = require('./user');

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
    created_by: User
});

const Article = module.exports = mongoose.model('Article', ArticleSchema);