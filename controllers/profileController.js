// profileController.js

exports.profileGet = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');  // Wenn der Benutzer nicht eingeloggt ist, wird er zur Login-Seite umgeleitet
    }

    res.render('profile', {
        title: 'Profile',
        user: req.user // Benutzerinformationen an die View übergeben
    });
};
