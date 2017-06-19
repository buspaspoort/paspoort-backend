let User = require("../schemas/User");
let Series = require("../schemas/Series");
let Bus = require("../schemas/Bus");
let Region = require("../schemas/Region");
let Report = require("../schemas/Report");

class regions {
    static create(name, type) {
        return new Promise((resolve, reject) => {
            Region.sync().then(function () {
                Region.create({name: name, type: type})
                    .then((series) => {
                        resolve(series.dataValues);
                    }).catch(err => reject(err))
            });
        })
    }

    static update(regionId, datetime) {
        console.log(datetime);
        return new Promise((resolve, reject) => {
            let date = new Date();
            Bus.findAll({where: {regionId: regionId, updatedAt: {$gte: datetime}}, raw: true})
                .then(busses => {
                    let seriesIds = [], busIds = [];
                    let index = 0;
                    for (let bus of busses) {
                        busses[index]["reports"] = [];
                        index++;
                        busIds.push(bus.busId);

                        for (let key in bus) {
                            if (key === "seriesId") {
                                if (bus.hasOwnProperty(key)) {
                                    if (!seriesIds.includes(bus[key])) seriesIds.push(bus[key]);
                                }
                            }
                        }
                    }

                    Series.findAll({where: {seriesId: seriesIds, updatedAt: {$gte: datetime}}, raw: true})
                        .then(series => {
                            Report.findAll({where: {busId: busIds, history: false, updatedAt: {$gte: datetime}}, raw: true})
                                .then(reports => {
                                    let index = 0;

                                    for (let bus of busses) {
                                        busses[index]["reports"] = [];
                                        for (let report of reports) {

                                            if (report.busId === bus.busId) {
                                                busses[index]["reports"].push(report);
                                            }
                                        }

                                        index++;
                                    }

                                    resolve({
                                        busses: busses,
                                        series: series,
                                        reports: reports.length,
                                        date: date
                                    });
                                }).catch(err => reject(err));
                        }).catch(err => reject(err));


                })
        })
    }

    static importAll(regionId) {
        return new Promise((resolve, reject) => {
            let date = new Date();
            Bus.findAll({where: {regionId: regionId}, raw: true})
                .then(busses => {
                    let seriesIds = [], busIds = [];
                    let index = 0;
                    for (let bus of busses) {
                        busses[index]["reports"] = [];
                        index++;
                        busIds.push(bus.busId);

                        for (let key in bus) {
                            if (key === "seriesId") {
                                if (bus.hasOwnProperty(key)) {
                                    if (!seriesIds.includes(bus[key])) seriesIds.push(bus[key]);
                                }
                            }
                        }
                    }

                    Series.findAll({where: {seriesId: seriesIds}, raw: true})
                        .then(series => {
                            Report.sync().then(function () {

                                Report.findAll({where: {busId: busIds, history: false}, raw: true})
                                    .then(reports => {
                                        let index = 0;

                                        for (let bus of busses) {
                                            busses[index]["reports"] = [];

                                            for (let report of reports) {
                                                if (report.busId === bus.busId) {
                                                    busses[index]["reports"].push(report);
                                                }
                                            }

                                            index++;
                                        }

                                        resolve({busses: busses, series: series, reports: reports.length, date: date});
                                    }).catch(err => reject(err));
                            }).catch(err => reject(err));
                        })
                })
        })
    }
}

class reports {
    static create(reports) {
        return new Promise((resolve, reject) => {
            Report.sync().then(function () {
                Report.bulkCreate(reports)
                    .then(() => {
                        resolve(true);
                    }).catch(err => reject(err))
            });
        })
    }

    static createOne(report) {
        return new Promise((resolve, reject) => {
            Report.sync().then(function () {
                Report.create(report)
                    .then((report) => {
                        resolve(report);
                    }).catch(err => reject(err))
            });
        })
    }
}

class series {
    static create(name, manu, type) {
        return new Promise((resolve, reject) => {
            Series.sync().then(function () {
                Series.create({name: name, manufacturer: manu, type: type})
                    .then((series) => {
                        resolve(series.dataValues);
                    }).catch(err => reject(err))
            });
        })
    }
}

class busses {
    static updateById(id, update) {
        return new Promise((resolve, reject) => {
            Bus.update(
                update,
                {where: {busId: id}}
                )
                .then((bus) => {
                    resolve(bus)
                }).catch(err => reject(err));
        })
    }

    static create(nr, serviceDate, seriesId, regionId, mgmtStatus, techStatus, priority) {
        return new Promise((resolve, reject) => {
            Bus.sync().then(function () {
                Bus.create({
                    busNr: nr,
                    serviceDate: serviceDate,
                    seriesId: seriesId,
                    regionId: regionId,
                    mgmtStatus: mgmtStatus,
                    techStatus: techStatus,
                    priority: priority
                })
                    .then((bus) => {
                        resolve(bus.dataValues)
                    }).catch(err => reject(err));
            })
        })
    }
}

class users {
    static create(uid, type) {
        return new Promise((resolve, reject) => {
            User.sync().then(function () {
                User.create({uid: uid, type: type})
                    .then((user) => {
                        resolve(user.dataValues);
                    }).catch(err => reject(err))
            });
        })
    }
}

module.exports = {
    series: series,
    busses: busses,
    users: users,
    regions: regions,
    reports: reports
};