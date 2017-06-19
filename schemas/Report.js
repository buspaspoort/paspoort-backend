let sequelize = require("sequelize");
let db = require("../helpers/dbConnection");

let Report = db.define('report', {
    reportId: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    busId: {
        type: sequelize.INTEGER
    },
    busNr: {
        type: sequelize.INTEGER
    },
    date: {
        type: sequelize.DATE
    },
    observerID: {
        type: sequelize.STRING
    },
    observerName: {
        type: sequelize.STRING
    },
    shortDescription: {
        type: sequelize.STRING
    },
    description: {
        type: sequelize.STRING
    },
    damageMarker: {
        type: sequelize.STRING
    },
    priority: {
        type: sequelize.INTEGER
    },
    mgmtStatus: {
        type: sequelize.INTEGER
    },
    techStatus: {
        type: sequelize.INTEGER
    },
    history: {
        type: sequelize.BOOLEAN
    }
});

module.exports = Report;