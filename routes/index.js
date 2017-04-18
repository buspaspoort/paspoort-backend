let express = require('express');
let router = express.Router();
let path = require("path");

let auth = require("../middlewares/authenticator");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.get("/getupdates", auth, function (req, res, next) {
    let t = req.query.t;
    if (t !== undefined && t !== "") res.json({"time": t});
    else return next(new Error("Not a valid timestamp"));
});

module.exports = router;
