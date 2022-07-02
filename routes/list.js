
var express    = require("express"),
    router     = express.Router(),
    User       = require("../models/user"),
    List       = require("../models/list"),
    middleware = require("../middleware");


//INDEX ROUTE    
router.get("/", middleware.isLoggedIn, function(req, res) {
    User.findById(req.user._id).populate("lists").exec(function(err, founduser) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("lists/index", {user: founduser});
        }
    });
});


// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if(err) {
            console.log(err);
        }
        else {   
            var date = req.body.date;
            var newList = {date: date};

            List.create(newList, function(err, list) {
                if(err) {
                    console.log(err);
                }
                else { 
                    list.save();
                    user.lists.push(list);
                    user.save();

                    res.redirect("/lists");
                }
            });
        }
    });
});


// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("lists/new");
});


// SHOW ROUTE
router.get("/:id", function(req, res) {
    List.findById(req.params.id).populate("items").exec(function(err, foundList) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("lists/show", {list: foundList});
        }
    });
});


// DELETE ROUTE
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
    List.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/lists");
        }
    });
});

module.exports = router;