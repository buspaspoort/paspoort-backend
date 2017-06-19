let Sequelize = require("sequelize");

let sequelize = new Sequelize("buspaspoort", "buspaspoort", "4ZmM6QHFw5GEpT4JHVeDHXCD", {
    host: "buspaspoort.database.windows.net",
    dialect: "mssql",
    dialectOptions: {
        encrypt: true
    }
});

module.exports = sequelize;