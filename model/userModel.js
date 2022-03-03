const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Joi = require('joi');
const Interest = require('./interModel');

const User = sequelize.define('user', {

    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: false,
    },
    interestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'interests',
            key: 'id'
        }
    }

})

User.prototype.toJSON = function () {
    return {
        userId: this.id,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        gender: this.gender,
        interest: this.interest
    }
}

// function validate(user) {
//     const schema = Joi.object({
//         firstname: Joi.string().min(5).required(),
//         lastname: Joi.string().min(5).required(),
//         email: Joi.string().email().required(),
//         gender: Joi.string().required().valid('male', 'female', 'other'),
//         interestId: Joi
//             .required()
//             .custom(method, 'custom validation')
//     });
//     return schema.validate(user)
// }

module.exports = User;


















