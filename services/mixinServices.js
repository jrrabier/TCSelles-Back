const validationServices = require('./validationServices')
const bcrypt = require('bcryptjs');
const errorMsg = require('../assets/messages/error-messages.json')

module.exports.validateAndHashPassword = (password, callback) => {
    var isValidPassword = validationServices.isPasswordValid(password);

    if (isValidPassword) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
                callback(null, hash);
            });
        });
    } else {
        callback(new Error(errorMsg.invalidPsw))
    }
}

/**
 * Renvoi la saison en cours ou la saison suivante en fonction d'une date de référence
 * GESTION DES SAISONS
 *  Avant le 01/09 de l'année en cours, toutes les rencontres créées sont sur la saison en cours => "année_en_cours - 1 / année_en_cours"
 *  Après le 01/09 de l'année en cours, toutes les rencontres créées sont pour la saison suivante => "année_en_cours / année_en_cours + 1"
 * @returns {string} season_years (ex : "2019/2020")
 */
module.exports.getSeasonYears = () => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let refDate = new Date(currentYear,8,1); // 01/09 de l'année en cours
    let season_years = "";

    if (currentDate < refDate) {
        season_years = (currentYear - 1).toString() + '/' + currentYear.toString();
    } else {
        season_years = currentYear.toString() + '/' + (currentYear + 1).toString();
    }

    return season_years;
}