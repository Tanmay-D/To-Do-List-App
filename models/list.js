var mongoose = require("mongoose");

var listSchema = new mongoose.Schema({
    date: String,

    items : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    ]
});

module.exports = mongoose.model("List", listSchema);