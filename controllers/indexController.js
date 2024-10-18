const db = require("../db/querys")

const indexMessageGet = async (req, res, next) => {
  //TODO: limit 10 all messages
  const allMessages = await db.getAllMessages()
  console.log(allMessages)
  res.render("index", {
    title: "Message Board - Home",
    allMessages: allMessages
  });
};

module.exports = { indexMessageGet };
