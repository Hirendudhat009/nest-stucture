const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Interest = sequelize.define('interest', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // userId: {
    //     type: Sequelize.INTEGER(),
    //     references: {
    //         model: 'users',
    //         key: 'id'
    //     }
    // }
}, );

Interest.prototype.toJSON = function () {
    return {
        interestId: this.id,
        name: this.name
    }
}

module.exports = Interest;