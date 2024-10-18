const db = require('../db/querys'); // Verweis auf die DB-Logik

exports.getMemberCodes = async (req, res, next) => {
  try {
    const codes = await db.getAllMemberCodes();
    res.render('member-codes', { codes });
  } catch (err) {
    next(err);
  }
};
