const { connect } = require("../controllers/teams_ctrl");

/**
 * Method to get all the category's ids the user belongs to
 * @param age reference age to get the category's ids the user belongs to
 * @param callback 
 */
module.exports.getCategoryIdsByAge = (age, callback) => {
    let req = 'SELECT id FROM tcselles.categories WHERE ? BETWEEN age_start AND age_end';

    connection.query(req, age, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

// SELECT id, label, sex
// FROM tcselles.categories;

// INSERT INTO tcselles.categories
// (label, sex)
// VALUES('', '');

// UPDATE tcselles.categories
// SET label='', sex=''
// WHERE id=0;

// DELETE FROM tcselles.categories
// WHERE id=0;
