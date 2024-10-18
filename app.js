const express = require('express');
const session = require('express-session');
const pgPool = require('./db/pool'); 
const path = require('path');
const passport = require('passport');
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
app.use(express.urlencoded({extended: true}));

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

// Initialize Passport.js
require('./config/passport');
app.use(passport.session());

// Make the user available in all views
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
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
const memberCodeRouter = require('./routes/memberCodeRouter'); // Neu hinzugefügt

app.use('/', indexRouter);
app.use("/messages", messageRouter);
app.use("/", memberCodeRouter); // Neu hinzugefügt

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


/*
const globalMiddleWare = (req, res, next) => {
    console.log('global middleware running...');
    next();
};

// Register global middleware
app.use(globalMiddleWare);

const middleware = (req, res, next) => {
    res.send('hello express');
    next();
};

const middleware2 = (req, res, next) => {
    console.log('this is middleware #2');
    next();
};

const middleware3 = (req, res) => {
    console.log('this is middleware #3');
};

// Define routes
app.get('/', middleware, middleware2, middleware3);

app.get('/users/:userId', (req, res) => {
    console.log(`This is my user Id: ${req.params.userId}`);
    res.send(`This is my user Id: ${req.params.userId}`);
});
app.get('users/create', (req, res) => {
    res.send(`create new user`)
})

app.get('/login', (req, res) => {
    res.send('this is login');
});
*/
