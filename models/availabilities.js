module.exports.addAvailability = (newAvailability, callback) => {
    var req = 'INSERT INTO tcselles.availabilities SET ?';

    connection.query(req, newAvailability, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

module.exports.getAllAvailabilities = (callback) => {
    var req = 'SELECT users_id, meetings_id, status, is_playing FROM tcselles.availabilities';

    connection.query(req, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

module.exports.getAvailabilityById = (availability, callback) => {
    var req = 'SELECT users_id, meetings_id, status, is_playing FROM tcselles.availabilities WHERE users_id=? AND meetings_id=?';

    connection.query(req, [availability.u_id, availability.m_id], (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

module.exports.updateAvailability = (updatedAvailability, callback) => {
    var isPlayingReq = "UPDATE tcselles.availabilities SET status=?, is_playing=? WHERE users_id=? AND meetings_id=?";
    var req = "UPDATE tcselles.availabilities SET status=? WHERE users_id=? AND meetings_id=?";

    if (updatedAvailability.is_playing) {
    
        connection.query(isPlayingReq, [updatedAvailability.status, updatedAvailability.is_playing, updatedAvailability.users_id, updatedAvailability.meetings_id], (err, result) => {
            if (err) {
                throw err;
            }
            callback(null, result);
        });
    } else {
    
        connection.query(req, [updatedAvailability.status, updatedAvailability.users_id, updatedAvailability.meetings_id], (err, result) => {
            if (err) {
                throw err;
            }
            callback(null, result);
        });
    }
}

module.exports.deleteAvailability = (availability, callback) => {
    var req = "DELETE FROM tcselles.availabilities WHERE users_id=? AND meetings_id=?";

    connection.query(req, [availability.users_id, availability.meetings_id], (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

module.exports.isAvailabilityExist = (availability) => {
    return new Promise((resolve, reject) => {
        let req = 'SELECT users_id, meetings_id FROM tcselles.availabilities WHERE users_id=? AND meetings_id=?';
    
        connection.query(req, [availability.users_id, availability.meetings_id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    })
}

