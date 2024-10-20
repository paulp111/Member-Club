const passport = require('passport');

// Zeigt die Login-Seite an
const loginGet = (req, res, next) => {
    res.render('login', {
        title: 'Login',
        error: req.flash('error')  // Flash-Fehlermeldung anzeigen, wenn vorhanden
    });
};

// Verarbeitet das Login mit Passport.js und Callback für bessere Fehlerbehandlung
const loginPost = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);  // Fehler während der Authentifizierung
        }
        if (!user) {
            req.flash('error', info.message);  // Fehlermeldung setzen
            return res.redirect('/login');     // Zur Login-Seite zurückleiten bei Fehler
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);  // Fehler beim Einloggen
            }
            return res.redirect('/profile');  // Erfolgreiches Login -> Weiterleitung zur Profilseite
        });
    })(req, res, next);
};

// Logout-Funktion: Beendet die Benutzersitzung und leitet zur Login-Seite weiter
const logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg', 'You are logged out');  // Flash-Nachricht für Logout
        res.redirect('/login');  // Zur Login-Seite zurückleiten
    });
};

module.exports = {
    loginGet,
    loginPost,
    logout
};
