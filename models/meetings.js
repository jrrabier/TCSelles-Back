const mixinServices = require('../services/mixinServices');

module.exports.addMeeting = (newMeeting, callback) => {
    let season_years = mixinServices.getSeasonYears();
    var req = 'INSERT INTO tcselles.meetings SET ?';
    newMeeting.season_years = season_years;

    connection.query(req, newMeeting, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

module.exports.getAllMeetings = (callback) => {
    var req = 'SELECT id, categories_id, `date`, sexes_id, season, season_years FROM tcselles.meetings';

    connection.query(req, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

module.exports.getMeeting = (id, callback) => {
    var req = 'SELECT id, categories_id, `date`, sexes_id, season, season_years FROM tcselles.meetings WHERE id=?';

    connection.query(req, id, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

module.exports.updateMeeting = (updatedMeeting, callback) => {
    var req = "UPDATE tcselles.meetings SET ? WHERE id=?";

    connection.query(req, [updatedMeeting, updatedMeeting.id], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        callback(null, result);
    });
}

module.exports.deleteMeeting = (id, callback) => {
    var req = "DELETE FROM tcselles.meetings WHERE id=?";

    connection.query(req, id, (err, result) => {
        if (err) {
            throw err;
        }
        callback(null, result);
    });
}

module.exports.isMeetingExist = (meeting) => {
    return new Promise((resolve, reject) => {
        let req = 'SELECT id, categories_id, `date`, sexes_id FROM tcselles.meetings WHERE categories_id=? AND `date`=? AND sexes_id=?';
    
        connection.query(req, [meeting.categories_id, meeting.date, meeting.sexes_id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    })
}