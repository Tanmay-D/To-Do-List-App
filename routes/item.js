var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    List       = require("../models/list"),
    Item       = require("../models/item"),
    middleware = require("../middleware");


// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    List.findById(req.params.id, function(err, reqList) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(req.params.id);
            console.log(reqList);
            res.render("items/new", {list: reqList});
        } 
    });
});


// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
    List.findById(req.params.id, function(err, list) {
        if(err) {
            console.log(err);
        }
        else {
            Item.create(req.body.item, function(err, item) {
                if(err) {
                    console.log(err);
                }
                else {
                    item.save();
                    list.items.push(item);
                    list.save();

                    res.redirect("/lists/" + list._id);

                }
            });
        }
    });
});


// EDIT ROUTE
router.get("/:item_id/edit", middleware.isLoggedIn, function(req, res) {
    Item.findById(req.params.item_id, function(err, foundItem) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("items/edit", {list_id: req.params.id, item: foundItem});
        }
    });
});


// UPDATE ROUTE
router.put("/:item_id", middleware.isLoggedIn, function(req, res) {
    Item.findByIdAndUpdate(req.params.item_id, req.body.item, function(err, updatedItem) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/lists/" + req.params.id);
        }
    });
});


// DELETE ROUTE
router.get("/:item_id", middleware.isLoggedIn, function(req, res) {
    Item.findByIdAndDelete(req.params.item_id, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/lists/" + req.params.id);
        }
    });
});

module.exports = router;