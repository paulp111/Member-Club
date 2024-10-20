const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("../db/querys");
const { verifyPassword } = require("../lib/passportUtils");

const verifyCallback = async (username, password, done) => {
    try {
        const user = await db.getUserCredentials(username);
        console.log("User found:", user);

        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }

        const match = await verifyPassword(password, user.password);
        console.log("Password match:", match);

        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);  // Authentifizierung erfolgreich

    } catch (err) {
        console.log("Error during verification:", err);
        return done(err);
    }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

// Benutzer-ID in der Session speichern
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Benutzer anhand der ID abrufen und in `req.user` speichern
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
