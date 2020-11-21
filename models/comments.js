const mixinServices = require('../services/mixinServices');

/**
 * Query to add a comment
 * @param newComment the comment to add
 * @param callback 
 */
module.exports.addComment = (newComment, callback) => {
    var req = 'INSERT INTO tcselles.comments SET ?';

    connection.query(req, newComment, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

/**
 * Query to get a comment
 * @param id comment's id to get
 * @param callback 
 */
module.exports.getComment = (id, callback) => {
    var req = 'SELECT id, title, content, image, created_at, updated_at, users_id, articles_categories_id FROM tcselles.comments WHERE id=?';

    connection.query(req, id, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

/**
 * Query to update a comment
 * @param updatedComment comment to update
 * @param callback 
 */
module.exports.updateComment = (updatedComment, callback) => {
    var req = "UPDATE tcselles.comments SET ? WHERE id=?";

    connection.query(req, [updatedComment, updatedComment.id], (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

/**
 * Query to delete a comment
 * @param id comment's id to delete
 * @param callback 
 */
module.exports.deleteComment = (id, callback) => {
    var req = "DELETE FROM tcselles.comments WHERE id=?";

    connection.query(req, id, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}