const mixinServices = require('../services/mixinServices');

module.exports.addMeeting = (newMeeting, callback) => {
    let season_years = mixinServices.getSeasonYears();
    let req = 'INSERT INTO tennisclub.meetings SET ?';
    newMeeting.season_years = season_years;

    connection.query(req, newMeeting, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

module.exports.getAllMeetings = (callback) => {
    let req = 'SELECT id, categories_id, `date`, sex, season, season_years FROM tennisclub.meetings';

    connection.query(req, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

module.exports.getMeeting = (id, callback) => {
    let req = 'SELECT id, categories_id, `date`, sex, season, season_years FROM tennisclub.meetings WHERE id=?';

    connection.query(req, id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

module.exports.updateMeeting = (updatedMeeting, callback) => {
    let req = "UPDATE tennisclub.meetings SET ? WHERE id=?";

    connection.query(req, [updatedMeeting, updatedMeeting.id], (err, result) => {
        if (err) {
            callback(err);
        }
        console.log(result);
        callback(null, result);
    });
}

module.exports.deleteMeeting = (id, callback) => {
    let req = "DELETE FROM tennisclub.meetings WHERE id=?";

    connection.query(req, id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

module.exports.isMeetingExist = (meeting) => {
    return new Promise((resolve, reject) => {
        let req = 'SELECT id, categories_id, `date`, sex FROM tennisclub.meetings WHERE categories_id=? AND `date`=? AND sex=?';
    
        connection.query(req, [meeting.categories_id, meeting.date, meeting.sex], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    })
}