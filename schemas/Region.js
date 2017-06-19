let sequelize = require("sequelize");
let db = require("../helpers/dbConnection");

let Region = db.define('region', {
    regionId: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING
    },
    type: {
        type: sequelize.INTEGER
    }
});

module.exports = Region;