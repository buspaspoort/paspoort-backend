let sequelize = require("sequelize");
let db = require("../helpers/dbConnection");

let User = db.define('user', {
    id: {
        type: sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    uid: {
        type: sequelize.STRING
    },
    type: {
        type: sequelize.INTEGER
    }
});

module.exports = User;