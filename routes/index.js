var express  = require("express"),
    router   = express.Router(),
    User     = require("../models/user"),
    passport = require("passport");


router.get("/", function(req, res) {
    res.render("landing");
});


// SIGN-UP FORM
router.get("/register", function(req, res) {
    res.render("register");
});


// Handle Sign Up Logic
router.post("/register", function(req, res) {

    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/");
        }
    });
});


// LOGIN FORM
router.get("/login", function(req, res) {
    res.render("login");
});


// Handle Login Logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/lists",
        failureRedirect: "/login"
    }
    ), function(req, res) {
});


// Logout Logic
router.get("/logout", function(req, res) {
    req.logout(function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/lists");
        }
    });
});


module.exports = router;