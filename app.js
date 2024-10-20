const express = require('express');
const session = require('express-session');
const pgPool = require('./db/pool'); 
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash'); 
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();

// Define public assets path (frontend)
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Define view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Read body (for form data)
app.use(express.urlencoded({ extended: true }));

// Set session store to DB
const sessionStore = require("./session/sessionStore");
console.log(pgPool); // Debugging

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: { 
            maxAge: 24 * 60 * 60 * 1000 // 1 Tag
        },
    })
);

// Initialize Flash Messages
app.use(flash());

// Initialize Passport.js
require('./config/passport');
app.use(passport.initialize());  // Initialisiert Passport
app.use(passport.session());     // Benutzersitzung über Passport

// Make flash messages and user available in all views
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Debugging: Log session and user information
app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

// Load routers
const indexRouter = require('./routes/indexRouter');
const messageRouter = require("./routes/messageRouter");
const memberCodeRouter = require('./routes/memberCodeRouter'); 

app.use('/', indexRouter);
app.use("/messages", messageRouter);
app.use("/", memberCodeRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
