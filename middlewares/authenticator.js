let admin = require("firebase-admin");

function firebaseAuthenticator(req, res, next) {
    console.log("test");
    let firebaseIDToken = req.get("Authorization");
    console.log(firebaseIDToken);

    res.locals.error = false;

    if(firebaseIDToken === undefined) {
        let err = new Error("No Firebase ID Token header found");
        return next(err);
    } else {
        admin.auth().verifyIdToken(firebaseIDToken)
            .then(function(decodedToken) {
                res.locals.firebaseUser = decodedToken;
                res.locals.uid = decodedToken.uid;
                next();
            }).catch(function(error) {
            return next(error);
        });
    }
}

module.exports = firebaseAuthenticator;
