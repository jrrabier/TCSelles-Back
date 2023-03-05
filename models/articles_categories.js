const mixinServices = require('../services/mixinServices');

/**
 * Query to add an article
 * @param newArticle the article to add
 * @param callback 
 */
module.exports.addArticleCategory = (newArticleCategory, callback) => {
    let req = 'INSERT INTO tennisclub.articles_categories SET ?';

    connection.query(req, newArticleCategory, (err, result) => {
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
module.exports.getAllArticlesCategories = (callback) => {
    let req = 'SELECT id, label FROM tennisclub.articles_categories';

    connection.query(req, (err, result) => {
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
module.exports.getAllArticlesByCategory = (id, callback) => {
    let req = 
        'SELECT a.id, a.title, a.content, a.image, DATE_FORMAT(a.created_at, "%d/%m/%Y") as created_at, a.updated_at, u.lastname, u.firstname, u.avatar, ac.label '+
        'FROM tennisclub.articles a '+
        'INNER JOIN users u ON a.users_id = u.id '+
        'INNER JOIN articles_categories ac ON a.articles_categories_id = ac.id '+
        'WHERE a.articles_categories_id = ? '+
        'ORDER BY a.created_at DESC';

    connection.query(req, id, (err, result) => {
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
module.exports.getArticleCategory = (id, callback) => {
    let req = 'SELECT id, label FROM tennisclub.articles_categories WHERE id=?';

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
module.exports.updateArticleCategory = (updatedArticleCategory, callback) => {
    let req = "UPDATE tennisclub.articles_categories SET label=? WHERE id=?";

    connection.query(req, [updatedArticleCategory.label, updatedArticleCategory.id], (err, result) => {
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
module.exports.deleteArticleCategory = (id, callback) => {
    let req = "DELETE FROM tennisclub.articles_categories WHERE id=?";

    connection.query(req, id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}
