/**
 * Query to add the user's categories in which he belongs
 * @param newUserCategories the user's category/categories to add
 * @param callback 
 */
module.exports.addUserCategories = (newUserCategories, callback) => {
    let req = 'INSERT INTO tennisclub.users_categories SET ?';

    connection.query(req, newUserCategories, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to get all the categories by user
 * @param user_id user's id to get the categories he belongs to
 * @param callback 
 */
module.exports.getAllCategoriesByUser = (user_id, callback) => {
    let req = 'SELECT id, title, content, image, created_at, updated_at, users_id, articles_categories_id FROM tennisclub.articles';

    connection.query(req, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to get all the users by category
 * @param category_id category's id
 * @param callback 
 */
module.exports.getAllUsersByCategory = (category_id, callback) => {
    let req = 'SELECT id, title, content, image, created_at, updated_at, users_id, articles_categories_id FROM tennisclub.articles WHERE id=?';

    connection.query(req, category_id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Method to update all the user's categories
 * @param callback 
 */
module.exports.updateUserCategories = (callback) => {
    let req = "UPDATE tennisclub.articles SET ? WHERE id=?";

    connection.query(req, [updatedUserCategory, updatedUserCategory.id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to delete a user's category
 * @param user_id user's id to delete
 * @param category_id category's id to delete
 * @param callback
 */
module.exports.deleteUserCategory = (user_id, category_id, callback) => {
    let req = "DELETE FROM tennisclub.users_categories WHERE users_id=?, categories_id=?";

    connection.query(req, [user_id, category_id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}