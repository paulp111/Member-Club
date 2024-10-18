const messageRouter = require("express").Router();

const messageController = require("../controllers/messageController");
messageRouter.get("/new", messageController.newMessageGet)
messageRouter.post("/new", messageController.newMessagePost)

module.exports = messageRouter;