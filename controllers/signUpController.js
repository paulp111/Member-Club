const { body, validationResult } = require("express-validator");
const db = require("../db/querys");
//TODO: use node crypto
const bcrypt = require("bcrypt");

const alphaError = "must have alphabetical chars.";
const lengthError = "must have at least 5 and max 30.";
const emailError = "must be of format example@mailserver.domain";
const passwordError =
  "must have at least 12 letters A/a - Z/z, a number, and a special char.";

const validateSchema = [
  body("forename")
    .isAlpha()
    .withMessage(`forename ${alphaError}`)
    .isLength({ min: 5, max: 30 })
    .withMessage(`forename ${lengthError}`)
    .trim(),
  body("surname")
    .isAlpha()
    .withMessage(`surname ${alphaError}`)
    .isLength({ min: 5, max: 30 })
    .withMessage(`surname ${lengthError}`)
    .trim(),
  body("email").isEmail().withMessage(`email ${emailError}`).trim(),
  body("password")
    .isLength({ min: 4 })
    .withMessage(`password ${passwordError}`)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    )
    .withMessage(
      "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .trim(),
  body("pass-confirm")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("passwords do not match"),
];

const signUpGet = (req, res) => {
  res.render("sign-up", {
    title: "Create new Account",
  });
};

const signUpPost = [
  validateSchema,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { forename, surname, email } = req.body;
      return res.render("sign-up", {
        title: "Sign-Up Errors",
        user: { forename, surname, email },
        errors: errors.array(),
      });
    }
    //Passwort verschlüsseln
    try {
      const { forename, surname, email, password } = req.body;
      console.log(db);
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) return res.render("error-page", { title: "Error" });
        await db.pushUser({
          forename,
          surname,
          email,
          password: hashedPassword,
        });
      });
      res.redirect("/login");
    } catch (err) {
      next(err);
    }
  },
];

module.exports = {
  signUpGet,
  signUpPost, 
};
