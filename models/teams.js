const mixinServices = require('../services/mixinServices');

/**
 * Query to add an article
 * @param newArticle the article to add
 * @param callback 
 */
module.exports.addArticle = (newArticle, callback) => {
    var req = 'INSERT INTO tcselles.articles SET ?';

    connection.query(req, newArticle, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

/**
 * Query to get all the articles
 * @param callback 
 */
module.exports.getAllArticles = (callback) => {
    var req = 'SELECT id, title, content, image, created_at, updated_at, users_id, articles_categories_id FROM tcselles.articles';

    connection.query(req, (err, result) => {
        if (err) {
            throw err;
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
    var req = 'SELECT id, title, content, image, created_at, updated_at, users_id, articles_categories_id FROM tcselles.articles WHERE id=?';

    connection.query(req, id, (err, result) => {
        if (err) {
            throw err;
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
    var req = "UPDATE tcselles.articles SET ? WHERE id=?";

    connection.query(req, [updatedArticle, updatedArticle.id], (err, result) => {
        if (err) {
            throw err;
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
    var req = "DELETE FROM tcselles.articles WHERE id=?";

    connection.query(req, id, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

// SELECT id, nb, sexes_id, clubs_id, users_id, categories_id
// FROM tcselles.teams;

// INSERT INTO tcselles.teams
// (nb, sexes_id, clubs_id, users_id, categories_id)
// VALUES(0, '', 0, NULL, 0);

// UPDATE tcselles.teams
// SET nb=0, sexes_id='', clubs_id=0, users_id=NULL, categories_id=0
// WHERE id=0;

// DELETE FROM tcselles.teams
// WHERE id=0;
