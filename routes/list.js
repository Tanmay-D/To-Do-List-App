var express    = require("express"),
    router     = express.Router(),
    List       = require("../models/list"),
    middleware = require("../middleware");


//INDEX ROUTE    
router.get("/", function(req, res) {
    List.find({}, function(err, allLists) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("lists/index", {lists: allLists});
        }
    });
});


// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
    var date = req.body.date;
    //var userId = currentUser.id;
    //var newList = {date: date, userId: userId};
    var newList = {date: date};

    List.create(newList, function(err, latestList) {
        if(err) {
            console.log(err);
        }
        else { 
            res.redirect("/lists");
        }
    });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("lists/new");
    //res.send("/lists/new route");
});


// SHOW ROUTE
router.get("/:id", function(req, res) {
    List.findById(req.params.id).populate("items").exec(function(err, foundList) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(foundList);
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