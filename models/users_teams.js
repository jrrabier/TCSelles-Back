const mixinServices = require('../services/mixinServices');

/**
 * Query to add an article
 * @param newUsersTeam the article to add
 * @param callback 
 */
module.exports.addUsersTeam = (newUsersTeam, callback) => {
    let req = 'INSERT INTO tennisclub.users_teams SET ?';

    connection.query(req, newUsersTeam, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

// /**
//  * Query to get all the articles
//  * @param callback 
//  */
// module.exports.getAllUsersTeams = (callback) => {
//     let req = 'SELECT users_id, teams_id FROM tennisclub.users_teams';

//     connection.query(req, (err, result) => {
//         if (err) {
//             callback(err);
//         }
//         callback(null, result);
//     });
// }

// /**
//  * Query to get an article
//  * @param id article's id to get
//  * @param callback 
//  */
// module.exports.getUsersTeam = (id, callback) => {
//     let req = 'SELECT id, title, content, image, created_at, updated_at, users_id, articles_categories_id FROM tennisclub.articles WHERE id=?';

//     connection.query(req, id, (err, result) => {
//         if (err) {
//             callback(err);
//         }
//         callback(null, result);
//     });
// }

/**
 * Query to update player's belonging to a team
 * @param updateddUsersTeam belonging to update
 * @param callback 
 */
module.exports.updateUsersTeam = (updatedUsersTeam, team_id, callback) => {
    let req = "UPDATE tennisclub.users_teams SET ? WHERE users_id=? AND teams_id=?";

    connection.query(req, [updatedUsersTeam, updatedUsersTeam.users_id, team_id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to delete player's belongings to a team
 * @param id ids to delete
 * @param callback 
 */
module.exports.deleteUsersTeam = (usersTeam, callback) => {
    let req = "DELETE FROM tennisclub.users_teams WHERE id=?";

    connection.query(req, usersTeam, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

module.exports.isUserAlreadyBelongsToTeam = (team) => {
    return new Promise((resolve, reject) => {
        let req = 'SELECT users_id, teams_id FROM tennisclub.users_teams WHERE users_id=? AND teams_id=?';
    
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
        let req = `SELECT ut.teams_id FROM tennisclub.users_teams ut 
            INNER JOIN tennisclub.teams t ON ut.teams_id = t.id 
            WHERE t.sex = ? AND t.categories_id = ? AND ut.users_id = ?`;
        
            connection.query(req, [team.sex, team.categories_id, user_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result[0]);
            });
    });
}
