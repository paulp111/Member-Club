const passport = require("passport");
const express = require("express");
const indexRouter = express.Router();

// Controller-Imports
const indexController = require("../controllers/indexController");
const signUpController = require("../controllers/signUpController");
const loginController = require("../controllers/loginController");
const profileController = require("../controllers/profileController");
const db = require('../db/querys'); // Für Benutzerabfrage

// Hauptseite mit Nachrichten
indexRouter.get("/", indexController.indexMessageGet);

// Sign-Up
indexRouter.get('/sign-up', signUpController.signUpGet);
indexRouter.post("/sign-up", signUpController.signUpPost);

// Login
indexRouter.get("/login", loginController.loginGet);
indexRouter.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",   // Nach erfolgreichem Login zur Profilseite
    failureRedirect: "/login",     // Bei Fehler zurück zur Login-Seite
    failureFlash: true             // Optional: Flash-Meldungen bei Fehlern anzeigen
}));

// Profilseite
indexRouter.get("/profile", profileController.profileGet);

// Route zum Anzeigen aller Benutzer (z.B. /users aufrufen)
indexRouter.get("/users", async (req, res) => {
  const users = await db.getAllUsers();
  res.render('users', { users });
});

// Logout
indexRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect("/login");
    });
});

module.exports = indexRouter;
