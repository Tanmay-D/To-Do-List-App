var port = 8000 || process.env.port;

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

var listRoutes  = require("./routes/list"),
    itemRoutes  = require("./routes/item");
    indexRoutes = require("./routes/index");


//seedDB();
mongoose.connect("mongodb://localhost/to_do_list");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


// PASSPORT CONFIGURATION
app.use(require("express-session") ({
    secret: "Ï love reading books!",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// COMMON VARIABLE FUNCTION
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


// EXPRESS ROUTE
app.use("/", indexRoutes);
app.use("/lists", listRoutes);
app.use("/lists/:id/items", itemRoutes);


app.listen(port, process.env.IP, function() {
    console.log("Server is starting ... ");
});