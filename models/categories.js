const { connect } = require("../controllers/teams_ctrl");

/**
 * Method to get all the category's ids the user belongs to
 * @param age reference age to get the category's ids the user belongs to
 * @param callback 
 */
module.exports.getCategoryIdsByAge = (age, callback) => {
    let req = 'SELECT id FROM tennisclub.categories WHERE ? BETWEEN age_start AND age_end';

    connection.query(req, age, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}

// SELECT id, label, sex
// FROM tennisclub.categories;

// INSERT INTO tennisclub.categories
// (label, sex)
// VALUES('', '');

// UPDATE tennisclub.categories
// SET label='', sex=''
// WHERE id=0;

// DELETE FROM tennisclub.categories
// WHERE id=0;
