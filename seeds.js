var mongoose    = require("mongoose");
var List    	= require("./models/list");
var Item        = require("./models/item");

var data = [
    {
        date: "21-06-2022"
    },
    {
        date: "22-06-2022"
    },
    {
        date: "23-06-2022"
    }
]
    

//  SEED FUNCTION
function seedDB() {

    List.remove({}, function(err) {
        if(err)
        {
            console.log(err);
        }
        console.log("Removed all the Lists!");
            
            data.forEach(function(seed) {
                List.create(seed, function(err, list) {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("Added a List");

                            Item.create(
                            {
                                name: "Item 1",
                                checked: false
                            }, function (err, item) {
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {
                                    list.items.push(item);
                                    list.save();
                                    console.log("Created a new Item");
                                }
                            });
                    } 
                });
            });
        });
    
}

module.exports = seedDB;