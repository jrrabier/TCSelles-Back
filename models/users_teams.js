const mixinServices = require('../services/mixinServices');

/**
 * Query to add an article
 * @param newdUsersTeam the article to add
 * @param callback 
 */
module.exports.addUsersTeam = (newdUsersTeam, callback) => {
    let req = 'INSERT INTO tcselles.users_teams SET ?';

    connection.query(req, newdUsersTeam, (err, result) => {
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
module.exports.getAllUsersTeams = (callback) => {
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
module.exports.getUsersTeam = (id, callback) => {
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
 * @param updateddUsersTeam article to update
 * @param callback 
 */
module.exports.updatedUsersTeam = (updateddUsersTeam, callback) => {
    let req = "UPDATE tcselles.articles SET ? WHERE id=?";

    connection.query(req, [updateddUsersTeam, updateddUsersTeam.id], (err, result) => {
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
module.exports.deletedUsersTeam = (id, callback) => {
    let req = "DELETE FROM tcselles.articles WHERE id=?";

    connection.query(req, id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

module.exports.isUserAlreadyBelongsToTeam = (team) => {
    return new Promise((resolve, reject) => {
        let req = 'SELECT users_id, teams_id FROM tcselles.users_teams WHERE users_id=? AND teams_id=?';
    
        connection.query(req, [team.users_id, team.teams_id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result[0]);
        });
    })
}

module.exports.isUserBelongsToOtherSameCatTeam = (team, user_id) => {
    return new Promise((resolve, reject) => {
        let req = `SELECT ut.teams_id FROM tcselles.users_teams ut 
            INNER JOIN tcselles.teams t ON ut.teams_id = t.id 
            WHERE t.sex = ? AND t.categories_id = ? AND ut.users_id = ?`;
        
            connection.query(req, [team.sex, team.categories_id, user_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                console.log(result[0]);
                resolve(result[0]);
            });
    });
}
