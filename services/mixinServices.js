const validationServices = require('./validationServices');
const bcrypt = require('bcryptjs');
const errorMsg = require('../assets/messages/error-messages.json');
const mixinServices = require('../services/mixinServices');
const { addUserCategories } = require('../models/users_categories');

module.exports.validateAndHashPassword = (password, callback) => {
    let isValidPassword = validationServices.isPasswordValid(password);

    if (isValidPassword) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    callback(err);
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
 * @returns {string} seasonYears (ex : "2019/2020")
 */
module.exports.getSeasonYears = () => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let refDate = new Date(currentYear,8,1); // 01/09 de l'année en cours
    let seasonYears = "";

    if (currentDate < refDate) {
        seasonYears = (currentYear - 1).toString() + '/' + currentYear.toString();
    } else {
        seasonYears = currentYear.toString() + '/' + (currentYear + 1).toString();
    }

    return seasonYears;
}

/**
 * Method to get the user's season age
 * Users belong to a category based on the age they will have during the season to come
 * @param {string} birthDate user's birth date
 * @returns {number} seasonAge
 */
module.exports.getUserSeasonAge = (birthDate) => {
    birthDate = new Date(birthDate);
    let birthYear = birthDate.getFullYear();
    let refYear = this.getSeasonYears().split("/")[1];
    let seasonAge = refYear - birthYear;

    return seasonAge;
}

module.exports.generateUsersCategoriesToInsert = (category_ids, user_id) => {
    let UserCategories = [];
    
    category_ids.forEach(id => {
        UserCategories.push({users_id: user_id, categories_id: id.id});
    });

    return UserCategories;
}