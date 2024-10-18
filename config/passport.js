const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("../db/querys")
const {verifyPassword} = require("../lib/passportUtils")

const verifyCallback = async (username, password, done) => {
    try {
        const user = await db.getUserCredentials(username);
        console.log(user);
        if(!user) {
            return done(null, false, {message: "Incorrect username"});
        }

        const match = await verifyPassword(password, user.password);
        if(!match) {
            return done(null, false, {message: "Incorrect password"});
        }

        return done(null, user);

    } catch (err) {
        done(err)
    }
}

const strategy = new LocalStrategy(verifyCallback)

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);
        done(null, user);
    } catch (err) {
        done(err)
    }
})