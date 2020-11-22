/**
 * Query to add a comment
 * @param newComment the comment to add
 * @param callback 
 */
module.exports.addComment = (newComment, callback) => {
    let req = 'INSERT INTO tcselles.comments SET ?';

    connection.query(req, newComment, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

/**
 * Query to get all the comments of an article
 * @param id article's id to get comments from
 * @param callback 
 */
module.exports.getCommentsByArticle = (article_id, callback) => {
    let req = 'SELECT id, message, created_at, updated_at, users_id FROM tcselles.comments WHERE articles_id = ?';

    connection.query(req, article_id, (err, result) => {
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
    updatedComment.updated_at = new Date;
    let req = "UPDATE tcselles.comments SET ? WHERE id=?";

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
    let req = "DELETE FROM tcselles.comments WHERE id=?";

    connection.query(req, id, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}