/**
 * Query to add a team
 * @param newTeam the team to add
 * @param callback 
 */
module.exports.addTeam = (newTeam, callback) => {
    let req = 'INSERT INTO tennisclub.teams SET ?';

    connection.query(req, newTeam, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to get all the teams
 * @param callback 
 */
module.exports.getAllTeams = (callback) => {
    let req = 'SELECT t.id, nb, t.sex, lastname, firstname, label ' + 
    'FROM tennisclub.teams t ' +
    'LEFT JOIN tennisclub.users u ON users_id = u.id ' + 
    'LEFT JOIN tennisclub.categories cat ON categories_id = cat.id';

    connection.query(req, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to get a team
 * @param id team's id to get
 * @param callback 
 */
module.exports.getTeam = (id, callback) => {
    let req = 'SELECT t.id, nb, t.sex, lastname, firstname, label ' +
    'FROM tennisclub.teams t ' +
    'LEFT JOIN tennisclub.users u ON users_id = u.id ' +
    'LEFT JOIN tennisclub.categories cat ON categories_id = cat.id ' +
    'WHERE t.id = ?';

    connection.query(req, id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to update a team
 * @param updatedTeam team to update
 * @param callback 
 */
module.exports.updateTeam = (updatedTeam, callback) => {
    let req = "UPDATE tennisclub.teams SET ? WHERE id=?";

    connection.query(req, [updatedTeam, updatedTeam.id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

/**
 * Query to delete a team
 * @param id team's id to delete
 * @param callback 
 */
module.exports.deleteTeam = (id, callback) => {
    let req = "DELETE FROM tennisclub.teams WHERE id=?";

    connection.query(req, id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

module.exports.isTeamExist = (team) => {
    return new Promise((resolve, reject) => {
        let req = 'SELECT id, nb, sex, users_id, categories_id FROM tennisclub.teams WHERE nb=? AND sex=? AND categories_id=?';
    
        connection.query(req, [team.nb, team.sex, team.categories_id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    })
}

module.exports.getTeamSexAndCatById = (id) => {
    return new Promise((resolve, reject) => {
        let req = 'SELECT sex, categories_id FROM tennisclub.teams WHERE id=?';

        connection.query(req, id, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result[0]);
        });
    });
}