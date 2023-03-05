
module.exports.getAllLevels = (callback) => {
    let req = 'SELECT id, label, lvl FROM tennisclub.levels ORDER BY lvl';

    connection.query(req, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}