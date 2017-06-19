let sequelize = require("sequelize");
let db = require("../helpers/dbConnection");
let Series = require("./Series");

let Bus = db.define('bus', {
    busId: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    busNr: {
        type: sequelize.INTEGER
    },
    serviceDate: {
        type: sequelize.DATEONLY
    },
    regionId: {
        type: sequelize.INTEGER
    },
    seriesId: {
        type: sequelize.INTEGER
    },
    mgmtStatus: {
        type: sequelize.INTEGER
    },
    techStatus: {
        type: sequelize.INTEGER
    },
    priority: {
        type: sequelize.INTEGER
    }
});

module.exports = Bus;