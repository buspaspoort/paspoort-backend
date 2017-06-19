let sequelize = require("sequelize");
let db = require("../helpers/dbConnection");
// let Bus = require("./Bus");

let Series = db.define('serie', {
    seriesId: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.INTEGER
    },
    manufacturer: {
        type: sequelize.STRING
    },
    type: {
        type: sequelize.STRING
    }
});


module.exports = Series;