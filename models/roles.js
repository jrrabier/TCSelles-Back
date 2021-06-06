
module.exports.getRolesByUsersId = (user_id, callback) => {
    let req = 
        'SELECT label ' +
        'FROM roles ' +
        'INNER JOIN users_roles ON id = roles_id ' +
        'WHERE users_id = ?';

    connection.query(req, user_id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}