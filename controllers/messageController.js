const {body, validationResult} = require("express-validator")
const db = require("../db/querys")
const {locals} = require("express/lib/application");

const lengthError = "must have at least 5 and max. 50 characters."
const messageLengthError = "must have at least 5 and max. 255 characters."

const validateSchema = [
    body("title")
        .isLength({min: 5, max: 50})
        .withMessage(`title ${lengthError}`)
        .trim(),
    body("message")
        .isLength({min: 5, max: 255})
        .withMessage(`surname ${messageLengthError}`)
        .trim(),
]

const newMessageGet = (req, res) => {
    res.render('new-message', {
        title: 'New Message',
    });
}

const newMessagePost = [
    validateSchema,
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const {title, message} = req.body
            return res.render("new-message", {
                title: "New Message",
                messageDetails: {title, message},
                errors: errors.array()
            })
        }
        if(req.user) {
            if(req.user.role !== "members" && req.user.role !== "admin") {
                console.log("Fehler 1")
                const {title, message} = req.body
                return res.render("new-message", {
                    title: "New Message",
                    messageDetails: {title, message},
                    errors: errors.array()
                })
            }
        } else {
            console.log("Fehler 2")
            const {title, message} = req.body
            return res.render("new-message", {
                title: "New Message",
                messageDetails: {title, message},
                errors: errors.array()
            })
        }
        try {
            const {title, message} = req.body;
            await db.pushNewMessage({title, message}, req.user)

            res.redirect("/")
        } catch (err) {
            next(err)
        }



    }];

module.exports = {newMessageGet, newMessagePost}