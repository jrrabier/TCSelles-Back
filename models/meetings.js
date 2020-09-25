module.exports.addMeeting = (newMeeting, callback) => {
    var req = 'INSERT INTO tcselles.meetings SET ?';

    connection.query(req, newMeeting, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

module.exports.getAllMeetings = (callback) => {
    var req = 'SELECT teams_home_id, teams_out_id, categories_id, `date`, sexes_id, teams_home_score, teams_out_score, division, championship, season, season_years  FROM tcselles.meetings';

    connection.query(req, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

module.exports.getMeeting = (params, callback) => {
    var req = 'SELECT teams_home_id, teams_out_id, categories_id, `date`, sexes_id, teams_home_score, teams_out_score, division, championship, season, season_years FROM tcselles.meetings WHERE teams_home_id=? AND teams_out_id=? AND categories_id=? AND `date`=? AND sexes_id=?';

    connection.query(req, [params.home,params.out,params.cat,params.date,params.sex], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

module.exports.updateMeeting = (updatedMeeting, callback) => {
    var req = "UPDATE tcselles.meetings SET ? WHERE teams_home_id=? AND teams_out_id=? AND categories_id=? AND `date`=? AND sexes_id=?";

    connection.query(req, [
        updatedMeeting, 
        updatedMeeting.teams_home_id,
        updatedMeeting.teams_out_id,
        updatedMeeting.categories_id,
        updatedMeeting.date,
        updatedMeeting.sexes_id
    ], 
    (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}


// DELETE FROM tcselles.meetings
// WHERE id=0;
