const mixinServices = require('../services/mixinServices');

/**
 * Query to add an article
 * @param newArticle the article to add
 * @param callback 
 */
module.exports.addArticle = (newArticle, callback) => {
    let req = 'INSERT INTO tcselles.articles SET ?';

    connection.query(req, newArticle, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to get all the articles
 * @param callback 
 */
module.exports.getAllArticles = (callback) => {
    let req = 'SELECT id, title, content, image, created_at, updated_at, users_id, articles_categories_id FROM tcselles.articles';

    connection.query(req, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to get an article
 * @param id article's id to get
 * @param callback 
 */
module.exports.getArticle = (id, callback) => {
    let req = 'SELECT id, title, content, image, created_at, updated_at, users_id, articles_categories_id FROM tcselles.articles WHERE id=?';

    connection.query(req, id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to update an article
 * @param updatedArticle article to update
 * @param callback 
 */
module.exports.updateArticle = (updatedArticle, callback) => {
    updatedArticle.updated_at = new Date;
    let req = "UPDATE tcselles.articles SET ? WHERE id=?";

    connection.query(req, [updatedArticle, updatedArticle.id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to delete an article
 * @param id article's id to delete
 * @param callback 
 */
module.exports.deleteArticle = (id, callback) => {
    let req = "DELETE FROM tcselles.articles WHERE id=?";

    connection.query(req, id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}