let express = require('express');
let router = express.Router();
let path = require("path");
let azure = require("azure-storage");

let auth = require("../middlewares/authenticator");
let repo = require("../repos/repo");

let User = require("../schemas/User");

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.post("/insertReport", function (req, res, next) {
    let report = req.body.report;
    report.mgmtStatus = 0;
    report.techStatus = 0;
    report.history = false;

    repo.reports.createOne(report)
        .then((report) => {
            repo.busses.updateById(report.busId, {mgmtStatus: 0, techStatus: 0}).then(bus => {
                let blobSvc = azure.createBlobService();

                blobSvc.createContainerIfNotExists("report", function (error, result, response) {
                    if (!error) {
                        blobSvc.createBlockBlobFromText("report", "report_" + report.reportId + "_d", req.body.report.detailPhoto, function (error, result, response) {
                            if (!error) {
                            } else console.log(error);
                        });

                        blobSvc.createBlockBlobFromText("report", "report_" + report.reportId + "_c", req.body.report.contextPhoto, function (error, result, response) {
                            if (!error) {
                            } else console.log(error);
                        });
                    } else console.log(error);

                    res.json(report.reportId);
                });
            }).catch((err) => {
                return next(err)
            });
        })
});

router.get("/getReportPhotos/:reportId", function (req, res, next) {
    let reportId = req.params.reportId;

    let blobSvc = azure.createBlobService();

    blobSvc.getBlobToText("report", "report_" + reportId + "_c", function (error, context, blob) {
        if (!error) {
            blobSvc.getBlobToText("report", "report_" + reportId + "_d", function (error, detail, blob) {
                if (!error) {
                    res.json({context: context, detail: detail, reportId: reportId});
                } else console.log(error);
            });
        } else console.log(error);
    });
});

router.get("/getRegions", function (req, res, next) {

});

router.post("/updateRegion/:regionId", function (req, res, next) {
    let regionId = req.params.regionId;
    let date = req.body.date;
    console.log(date);
    // let date = "2017-06-02 10:58:00.0000000";
    // let date = new Date("2017-06-02");

    repo.regions.update(regionId, date).then((bus) => res.json(bus)).catch((err) => {
        return next(err)
    });
});

router.get("/importRegion/:regionId", function (req, res, next) {
    let regionId = req.params.regionId;

    repo.regions.importAll(regionId).then(bus => res.json(bus)).catch((err) => {
        return next(err)
    })
});

router.get("/createRegion", function (req, res, next) {
    repo.regions.create("Brugge", Math.round(Math.random() * 520)).then(bus => res.json(bus)).catch((err) => {
        return next(err)
    })
});

router.get("/createBus/:seriesId/:regionId", function (req, res, next) {
    let seriesId = req.params.seriesId;
    let regionId = req.params.regionId;

    repo.busses.create("5802", new Date(), seriesId, regionId, 2, 3, 2).then(bus => res.json(bus)).catch((err) => {
        return next(err)
    })
});

router.get("/createSeries", function (req, res, next) {
    repo.series.create(1, "Van Hool", "A401").then(series => {
        res.json(series)
    }).catch((err) => {
        return next(err)
    })
});

router.get("/createUser", function (req, res, next) {
    repo.users.create("aaa", 1).then(user => res.json(user)).catch((err) => {
        return next(err)
    })
});

module.exports = router;
