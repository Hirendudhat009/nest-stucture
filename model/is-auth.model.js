const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Joi = require('joi');


const Login = sequelize.define('login', {

    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
})


// User.prototype.toJSON = function () {
//     return {
//         userId: this.id,
//         firstname: this.firstname,
//         lastname: this.lastname,
//         email: this.email,
//         gender: this.gender,
//         interest: this.interest
//     }
// }

module.exports = Login;


















