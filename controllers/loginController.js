const loginGet = (req, res, next) => {
    res.render('login', {
        title: 'login'
    });
};

module.exports = {
    loginGet,
}